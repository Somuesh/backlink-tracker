from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from .models import CrawlJob, CrawlResult

class CrawlJobAdmin(ModelAdmin):
    list_display = ('id', 'urls', 'target_domains', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('id',)

class CrawlResultAdmin(ModelAdmin):
    list_display = ('id', 'source_url', 'target_url')
    list_filter = ('job',)
    search_fields = ('id', 'source_url')

admin.site.register(CrawlJob, CrawlJobAdmin)
admin.site.register(CrawlResult, CrawlResultAdmin)