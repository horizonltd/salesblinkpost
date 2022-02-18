from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from core.models import Post, Comment
from core.serializers import PostSerializer, CommentSerializer, UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_posts(request):
    query = request.query_params.get('keyword')

    if query is None:
        query = ''

    posts = Post.objects.filter(title__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(posts, 8)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)

    serializer = PostSerializer(posts, many=True)

    return Response({
        'posts': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    user = request.user
    product = Post.objects.create(
        user=user,
        title='sample title',
        slug='sample slug',
        content='sample content',
    )

    serializer = PostSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_post(request, pk):
    data = request.data
    post = Post.objects.get(id=pk)
    post.title = data['title']
    post.slug = data['slug']
    post.content = data['content']

    post.save()

    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_post(request, pk):
    post = Post.objects.get(id=pk)
    post.delete()

    return Response("Post deleted.")

@api_view(['GET'])
@permission_classes([AllowAny])
def get_post(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def upload_post_image(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(id=post_id)

    post.image = request.FILES.get('image')
    post.save()

    return Response('Image uploaded')


"""CREATING POST VIEW"""

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post_comment(request, pk):
    user = request.user
    data = request.data
    post = Post.objects.get(id=pk)

    comment = Comment.objects.create(
        user=user,
        post=post,
        name=user.first_name,
        comment=data['comment'],
    )

    comment.save()
    # post.save()

    return Response({'detail': 'Comment is added'})