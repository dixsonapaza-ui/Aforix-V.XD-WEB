from django.contrib import admin
from .models import Local, AforoRecord

@admin.register(Local)
class LocalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'direccion', 'aforo_max', 'creado')
    search_fields = ('nombre',)

@admin.register(AforoRecord)
class AforoRecordAdmin(admin.ModelAdmin):
    list_display = ('local', 'aforo', 'timestamp', 'origen')
    list_filter = ('local',)
    ordering = ('-timestamp',)
