import os
import aiofiles
from typing import Optional
from fastapi import UploadFile
import PyPDF2
import pdfplumber
from docx import Document


class FileService:
    """Service for file processing"""
    
    def __init__(self, upload_dir: str = "uploads"):
        self.upload_dir = upload_dir
        os.makedirs(upload_dir, exist_ok=True)
    
    async def save_upload_file(self, upload_file: UploadFile) -> str:
        """Save uploaded file and return path"""
        file_path = os.path.join(self.upload_dir, upload_file.filename)
        
        async with aiofiles.open(file_path, 'wb') as f:
            content = await upload_file.read()
            await f.write(content)
        
        return file_path
    
    async def extract_text_from_file(self, file_path: str) -> str:
        """Extract text from various file formats"""
        _, ext = os.path.splitext(file_path)
        ext = ext.lower()
        
        try:
            if ext == '.pdf':
                return await self._extract_from_pdf(file_path)
            elif ext == '.docx':
                return await self._extract_from_docx(file_path)
            elif ext == '.txt':
                return await self._extract_from_txt(file_path)
            else:
                raise ValueError(f"Unsupported file format: {ext}")
        except Exception as e:
            print(f"Error extracting text from {file_path}: {e}")
            raise
    
    async def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        
        # Try with pdfplumber first (better for complex PDFs)
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            print(f"pdfplumber failed, trying PyPDF2: {e}")
            
            # Fallback to PyPDF2
            try:
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    for page in pdf_reader.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
            except Exception as e2:
                raise Exception(f"Failed to extract PDF text: {e2}")
        
        return text.strip()
    
    async def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX"""
        doc = Document(file_path)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text.strip()
    
    async def _extract_from_txt(self, file_path: str) -> str:
        """Extract text from TXT"""
        async with aiofiles.open(file_path, 'r', encoding='utf-8') as f:
            text = await f.read()
        return text.strip()
    
    async def cleanup_file(self, file_path: str):
        """Delete uploaded file"""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error cleaning up file {file_path}: {e}")


# Singleton instance
file_service = FileService()
