from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
from . import views

urlpatterns = [

    # USERS
    path('users/register/', views.register_user, name='register'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.get_user_profile, name='user_profile'),
    path('users/profile/update/', views.update_user_profile, name='user_profile_update'),

    # POSTS
    path('post/create/', views.create_post, name="add_post"),
    path('post/upload/', views.upload_post_image, name="upload_post_image"),
    path('post/', views.get_posts, name="get_posts"),
    path('post/<str:pk>/', views.get_post, name="post"),

    path('post/delete/<str:pk>/', views.delete_post, name="delete_post"),
    path('post/update/<str:pk>/', views.update_post, name="update_post"),

    # COMMENTS
    path('post/<str:pk>/comment/', views.create_post_comment, name="post_comment"),


]
