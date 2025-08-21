import { NextRequest, NextResponse } from 'next/server';
import { ContactForm } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Log the contact request
    
    // For now, we'll just log and return success (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', {
        name: body.name,
        email: body.email,
        company: body.company,
        service: body.service,
        message: body.message,
        timestamp: new Date().toISOString()
      });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We\'ll get back to you soon.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error);
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        success: false 
      },
      { status: 500 }
    );
  }
}
