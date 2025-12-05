from django.urls import path
from . import views

urlpatterns = [
    # ================================
    # ENDPOINT OFICIAL PARA EL ESP32
    # ================================
    path('api/recibir_aforo/', views.recibir_aforo, name='recibir_aforo'),

    # ================================
    # API REST (DRF)
    # ================================
    path('api/locales/', views.LocalListCreateAPI.as_view(), name='api_locales'),
    path('api/locales/<int:pk>/', views.LocalDetailAPI.as_view(), name='api_local_detail'),
    path('api/aforos/', views.AforoRecordListAPI.as_view(), name='api_aforos'),
    path('api/locales/<int:local_id>/ultimo/', views.ultimo_aforo_por_local, name='api_ultimo_aforo_local'),

    # ================================
    # FRONTEND
    # ================================
    path('login/', views.login_view, name='login'),
    path('', views.lista_locales_view, name='lista_locales'),
    path('local/<int:pk>/', views.detalle_local_view, name='detalle_local'),
    path('reportes/<int:local_id>/', views.reportes_local_view, name='local_report'),
]
