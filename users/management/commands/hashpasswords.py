from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password, is_password_usable
from users.models import User


class Command(BaseCommand):
  def handle(self, *args, **options):
    users = User.objects.all()
    for user in users:
      if not user.password.startswith('pbkdf2_sha256$'):
        user.password = make_password(user.password)
        user.save()

        self.stdout.write(
          self.style.SUCCESS(f'Successfully hashed password for {user.username}!')
        )
      
      else:
        self.stdout.write(
          f'Password already hashed for {user.username}!'
        )