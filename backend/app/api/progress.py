from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from beanie import PydanticObjectId
from app.models import UserProgress


router = APIRouter()


@router.post("/", response_model=UserProgress)
async def create_progress(
    user_id: str,
    skill: str,
    target_level: float = 1.0
):
    """Create a new skill progress tracker"""
    try:
        progress = UserProgress(
            user_id=user_id,
            skill=skill,
            target_level=target_level,
            started_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        await progress.insert()
        return progress
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error creating progress: {str(e)}"
        )


@router.get("/{user_id}", response_model=List[UserProgress])
async def get_user_progress(user_id: str):
    """Get all progress for a user"""
    try:
        progress_list = await UserProgress.find(
            UserProgress.user_id == user_id
        ).to_list()
        return progress_list
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching progress: {str(e)}"
        )


@router.put("/{progress_id}")
async def update_progress(
    progress_id: str,
    current_level: float | None = None,
    completed_resources: List[str] | None = None,
    notes: str | None = None
):
    """Update skill progress"""
    try:
        progress = await UserProgress.get(PydanticObjectId(progress_id))
        
        if not progress:
            raise HTTPException(status_code=404, detail="Progress not found")
        
        if current_level is not None:
            progress.current_level = current_level
        if completed_resources is not None:
            progress.completed_resources = completed_resources
        if notes is not None:
            progress.notes = notes
        
        progress.updated_at = datetime.utcnow()
        await progress.save()
        
        return progress
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error updating progress: {str(e)}"
        )


@router.delete("/{progress_id}")
async def delete_progress(progress_id: str):
    """Delete skill progress"""
    try:
        progress = await UserProgress.get(PydanticObjectId(progress_id))
        
        if not progress:
            raise HTTPException(status_code=404, detail="Progress not found")
        
        await progress.delete()
        return {"message": "Progress deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting progress: {str(e)}"
        )
