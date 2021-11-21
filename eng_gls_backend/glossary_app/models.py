from django.db import models
from django.core import exceptions as e
from users.models import User


class Glossary(models.Model):
    title = models.CharField(max_length=150)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Word(models.Model):
    word = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return self.word

class Translation(models.Model):
    translation_text = models.TextField()
    description = models.TextField()
    translation_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    for_word = models.ForeignKey(Word, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.translation_text


class WIGManager(models.Manager):
    def create_or_increment(self, *args, **kwargs):
        """  1. Try get existed word with glossary from db
             2. If exist just incremenet current value of repeated property
                and return object
             3. Otherwise update incoming kwargs by repeated = 1 and
             call original create method from manager
        """
        try:
            exist = self.get(**kwargs)
            exist.repeated += 1
            exist.save()
            return exist
        except e.ObjectDoesNotExist:
            kwargs.update({
                    "repeated": 1
                })
            return super().create(*args, **kwargs)

class WordInGlossary(models.Model):
    glossary = models.ForeignKey(Glossary, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    repeated = models.IntegerField()
    objects = WIGManager()

    def __str__(self) -> str:
        return '{}  {}'.format(self.glossary.title, self.word.word)


