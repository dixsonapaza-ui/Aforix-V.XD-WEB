from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView

from .models import Local, AforoRecord
from .serializers import LocalSerializer, AforoRecordSerializer

# -----------------------
# Endpoint para ESP32: recibe POST JSON sin CSRF
# -----------------------
@csrf_exempt
def recibir_aforo(request):
    """
    Espera JSON con al menos:
    {
       "local_id": 1,
       "aforo": 5,
       "origen": "ESP32-01"   // opcional
    }
    """
    if request.method != 'POST':
        return HttpResponseBadRequest("POST required")

    try:
        payload = json.loads(request.body.decode('utf-8'))
    except Exception as e:
        return HttpResponseBadRequest("JSON inválido: " + str(e))

    local_id = payload.get('local_id')
    aforo = payload.get('aforo')
    origen = payload.get('origen', '')

    if local_id is None or aforo is None:
        return HttpResponseBadRequest("Faltan campos 'local_id' o 'aforo'")

    try:
        local = Local.objects.get(pk=local_id)
    except Local.DoesNotExist:
        return JsonResponse({'error': 'Local no encontrado'}, status=404)

    # opcional: validar límites
    if aforo < 0:
        aforo = 0

    record = AforoRecord.objects.create(local=local, aforo=int(aforo), origen=origen)
    data = AforoRecordSerializer(record).data
    return JsonResponse(data, status=201)

# -----------------------
# API (DRF) para administrar / consultar registros y locales
# -----------------------
from rest_framework import permissions
from rest_framework import generics

class LocalListCreateAPI(generics.ListCreateAPIView):
    queryset = Local.objects.all().order_by('-creado')
    serializer_class = LocalSerializer
    permission_classes = [permissions.AllowAny]

class LocalDetailAPI(generics.RetrieveAPIView):
    queryset = Local.objects.all()
    serializer_class = LocalSerializer
    permission_classes = [permissions.AllowAny]

class AforoRecordListAPI(generics.ListAPIView):
    serializer_class = AforoRecordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        local_id = self.request.query_params.get('local')
        qs = AforoRecord.objects.all().order_by('-timestamp')
        if local_id:
            qs = qs.filter(local_id=local_id)
        return qs

# Último registro por local (útil para frontend)
@api_view(['GET'])
def ultimo_aforo_por_local(request, local_id):
    local = get_object_or_404(Local, pk=local_id)
    ultimo = local.registros.first()  # ordering -timestamp
    if not ultimo:
        return Response({'local': local_id, 'aforo': 0, 'timestamp': None})
    return Response({
        'local': local_id,
        'aforo': ultimo.aforo,
        'timestamp': ultimo.timestamp,
        'origen': ultimo.origen
    })
    
# -----------------------
# Vistas de plantilla (frontend)
# -----------------------
def login_view(request):
    return render(request, 'login.html')

def lista_locales_view(request):
    # plantilla mostrará lista; se obtienen vía AJAX o server-side
    return render(request, 'aforo/local_list.html')

def detalle_local_view(request, pk):
    # la plantilla pedirá datos por AJAX al endpoint /api/...
    context = {'local_id': pk}
    return render(request, 'aforo/local_detail.html', context)

def reportes_local_view(request, local_id):
    context = {'local_id': local_id}
    return render(request, 'aforo/local_report.html', context)

def reporte_diario_view(request, local_id):
    context = {'local_id': local_id}
    return render(request, 'aforo/reporte_diario.html', context)

def reporte_semanal_view(request, local_id):
    context = {'local_id': local_id}
    return render(request, 'aforo/reporte_semanal.html', context)

def reporte_mensual_view(request, local_id):
    context = {'local_id': local_id}
    return render(request, 'aforo/reporte_mensual.html', context)

import json
