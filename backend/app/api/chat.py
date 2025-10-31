from fastapi import APIRouter, HTTPException
from typing import List
from app.models import ChatMessage, ChatRequest
from app.services.llm_service import llm_service


router = APIRouter()

# In-memory chat history (in production, use database or session storage)
chat_sessions = {}


@router.post("/message", response_model=ChatMessage)
async def send_chat_message(request: ChatRequest):
    """
    Send a message to the AI career coach chatbot
    """
    try:
        # Get or create session history
        session_id = "default"  # In production, use user session ID
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Get chat history
        history = chat_sessions[session_id]
        
        # Generate response
        response_text = await llm_service.chat_response(
            user_message=request.message,
            context=request.context,
            chat_history=history
        )
        
        # Save to history
        user_msg = ChatMessage(role="user", content=request.message)
        assistant_msg = ChatMessage(role="assistant", content=response_text)
        
        history.append(user_msg.dict())
        history.append(assistant_msg.dict())
        
        # Keep only last 20 messages
        if len(history) > 20:
            chat_sessions[session_id] = history[-20:]
        
        return assistant_msg
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating chat response: {str(e)}"
        )


@router.get("/history", response_model=List[ChatMessage])
async def get_chat_history():
    """Get chat history"""
    session_id = "default"
    if session_id not in chat_sessions:
        return []
    
    return [ChatMessage(**msg) for msg in chat_sessions[session_id]]


@router.delete("/history")
async def clear_chat_history():
    """Clear chat history"""
    session_id = "default"
    if session_id in chat_sessions:
        chat_sessions[session_id] = []
    return {"message": "Chat history cleared"}
