from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_data, name='submit_data'),
    path('fetch/', views.fetch_data, name='fetch_data'),
]
