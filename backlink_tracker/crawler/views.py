from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CrawlJob
from .serializers import CrawlJobSerializer
from .tasks import run_crawler_task

class CrawlJobViewSet(viewsets.ModelViewSet):
    queryset = CrawlJob.objects.all().order_by('-created_at')
    serializer_class = CrawlJobSerializer

    def perform_create(self, serializer):
        job = serializer.save()
        run_crawler_task.delay(job.id)

    @action(detail=False, methods=['delete'])
    def perform_delete(self, job):
        job.delete()
        return Response({'message': 'Job deleted successfully'})

    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        job = self.get_object()
        return Response(CrawlJobSerializer(job).data)
