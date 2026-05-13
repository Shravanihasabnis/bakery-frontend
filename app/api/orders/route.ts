import { NextRequest, NextResponse } from 'next/server';

// This is a simple mock API route. In production, this would connect to your backend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.customerName || !body.customerEmail || !body.items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a mock order object
    const order = {
      _id: `ORDER-${Date.now()}`,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      address: body.address,
      city: body.city,
      zipCode: body.zipCode,
      items: body.items,
      totalAmount: body.totalAmount,
      paymentStatus: body.paymentStatus || 'pending',
      paymentMethod: body.paymentMethod || 'card',
      orderDate: new Date().toISOString(),
      status: 'confirmed',
    };

    // TODO: In production, save the order to your MongoDB database
    // const result = await ordersCollection.insertOne(order);
    // console.log('Order saved to database:', result);

    console.log('Order received:', order);

    // Return the created order
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve order details
export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // TODO: In production, fetch from your MongoDB database
    // const order = await ordersCollection.findOne({ _id: orderId });

    // Mock response
    const mockOrder = {
      _id: orderId,
      status: 'confirmed',
      totalAmount: 100.00,
    };

    return NextResponse.json(mockOrder);
  } catch (error) {
    console.error('Order retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}
