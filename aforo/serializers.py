from rest_framework import serializers
from .models import Local, AforoRecord

class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local
        fields = ['id', 'nombre', 'direccion', 'descripcion', 'aforo_max', 'creado']

class AforoRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AforoRecord
        fields = ['id', 'local', 'aforo', 'timestamp', 'origen']
        read_only_fields = ['id', 'timestamp']
