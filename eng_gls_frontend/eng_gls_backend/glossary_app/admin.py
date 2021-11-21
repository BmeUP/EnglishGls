from django.contrib import admin
from .models import Glossary, Word, Translation, WordInGlossary

models_lst = [Glossary, Word, Translation, WordInGlossary]

admin.site.register(models_lst)
