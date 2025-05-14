from rest_framework import serializers
from .models import CrawlJob, CrawlResult

class CrawlResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrawlResult
        fields = '__all__'

class CrawlJobSerializer(serializers.ModelSerializer):
    results = CrawlResultSerializer(many=True, read_only=True)

    class Meta:
        model = CrawlJob
        fields = '__all__'
