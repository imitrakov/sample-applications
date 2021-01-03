from django.http import JsonResponse

from cases.models import Case
from .models import CaseMailingList
from .mailchimp_service import add_mailchimp_email_with_tag
from .services import add_to_common_mailchimp_list, add_to_case_mailchimp_list


def add_to_common_list_view(request):
    """Веб-сервис, добавляющий email в общий лист"""

    email = request.GET.get('email')
    if not email:
        return JsonResponse({'success': False, 'message': 'Передайте email'})

    add_to_common_mailchimp_list(email=email)

    return JsonResponse({'success': True})


def add_to_case_list_view(request):
    """Веб-сервис, добавляющий email в лист рассылок по конкретному делу"""

    email = request.GET.get('email')
    if not email:
        return JsonResponse({'success': False, 'message': 'Передайте email'})
    case_id = request.GET.get('email')
    if not case_id:
        return JsonResponse({'success': False, 'message': 'Передайте case_id'})

    add_to_case_mailchimp_list(email=email, case_id=case_id)

    return JsonResponse({'success': True})
