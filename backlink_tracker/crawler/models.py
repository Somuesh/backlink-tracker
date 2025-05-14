from django.db import models

class CrawlJob(models.Model):
    STATUS_CHOICES = [
        ('queued', 'Queued'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    urls = models.TextField(help_text="Comma-separated list of URLs")
    target_domains = models.TextField(help_text="Comma-separated target domains")
    rate_limit = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='queued')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Title: {self.urls} - {self.target_domains}'

class CrawlResult(models.Model):
    job = models.ForeignKey(CrawlJob, on_delete=models.CASCADE, related_name='results')
    source_url = models.URLField()
    source_title = models.CharField(max_length=255)
    target_url = models.URLField()
    rel_attr = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f'{self.source_title} - {self.job}'
