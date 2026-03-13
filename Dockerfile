FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Silences GPU discovery warnings (Render has no GPU) and ML library noise
ENV CUDA_VISIBLE_DEVICES=""
ENV TF_CPP_MIN_LOG_LEVEL=2
ENV ONNXRUNTIME_LOG_LEVEL=3

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc g++ curl libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

# Create a virtual environment to avoid pip root warnings
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

# Create a non-root user for security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

RUN mkdir -p data/raw data/processed artifacts/models artifacts/chroma
COPY --chown=appuser:appuser backend ./backend
COPY --chown=appuser:appuser data_pipeline ./data_pipeline
COPY --chown=appuser:appuser .env.example ./.env.example
COPY --chown=appuser:appuser alembic.ini ./alembic.ini

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--app-dir", "backend", "--host", "0.0.0.0", "--port", "8000"]
