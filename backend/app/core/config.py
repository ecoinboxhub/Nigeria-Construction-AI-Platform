from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nigeria Construction AI Platform"
    env: str = "development"
    debug: bool = True
    api_prefix: str = "/api/v1"
    production_domain: str = ""

    api_key: str = "change-me"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = 120
    jwt_refresh_expires_minutes: int = 10080

    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/construction_ai"
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db: str = "construction_ai"

    vector_store: str = "chromadb"
    chroma_path: str = "./artifacts/chroma"
    chroma_persist_dir: str = "data/processed/vector_indexes"
    pinecone_api_key: str = ""
    pinecone_index: str = ""
    pinecone_env: str = ""

    openai_api_key: str = ""
    groq_api_key: str = ""
    huggingface_api_key: str = ""
    huggingfacehub_api_token: str = ""
    llm_default_model: str = "gpt-4o-mini"
    groq_default_model: str = "llama-3.3-70b-versatile"

    mlflow_tracking_uri: str = "./artifacts/mlruns"
    mlflow_experiment_prefix: str = "nigeria_construction"
    model_registry_path: str = "./artifacts/models"

    weather_api_key: str = ""
    openweather_api_key: str = ""
    weather_cache_ttl: int = 1800
    weather_cities: str = "Lagos,Abuja,Port Harcourt,Kano,Enugu"
    openweather_exclude_parts: str = "minutely,alerts"

    arounddeal_api_key: str = ""
    sensoto_api_key: str = ""
    datarade_api_key: str = ""

    redis_url: str = "redis://localhost:6379/0"
    scraping_interval_hours: int = 6
    jiji_base_url: str = "https://jiji.ng/building-materials"

    dvc_remote_url: str = ""
    render_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        protected_namespaces=("settings_",),
        extra="ignore",
    )


settings = Settings()
