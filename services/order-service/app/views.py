from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    data = request.data.copy()

    # 🔥 Get user from JWT token
    data['user_id'] = request.user.id

    serializer = OrderSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    user = request.user
    if user.role == 'admin':
        orders = Order.objects.all()
    else:
        orders = Order.objects.filter(user_id=user.id)

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)