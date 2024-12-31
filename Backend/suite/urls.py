from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_data, name='submit_data'),
    path('fetch/', views.fetch_data, name='fetch_data'),
    path('fetch/<str:product_id>/', views.fetch_product_by_id, name='fetch_product_by_id'),
    path('signup/', views.user_signup, name='user_signup'),
    path('login/', views.user_login, name='user_login'),
]
