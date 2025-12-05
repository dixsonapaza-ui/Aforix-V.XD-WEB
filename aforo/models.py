from django.db import models

class Local(models.Model):
    nombre = models.CharField(max_length=120)
    direccion = models.CharField(max_length=255, blank=True)
    descripcion = models.TextField(blank=True)
    aforo_max = models.PositiveIntegerField(default=10)
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

class AforoRecord(models.Model):
    local = models.ForeignKey(Local, related_name='registros', on_delete=models.CASCADE)
    aforo = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    origen = models.CharField(max_length=100, blank=True)  # por ejemplo "ESP32 #1" o "sensorA"

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.local.nombre} — {self.aforo} @ {self.timestamp:%Y-%m-%d %H:%M:%S}"
