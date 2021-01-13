from environs import Env

env = Env()
env.read_env()

API_TOKEN = env.str("TELEGRAM_API_TOKEN")
