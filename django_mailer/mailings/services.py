from typing import Union

from cases.models import Case
from mailings.mailchimp_service import add_mailchimp_email_with_tag
from mailings.models import CommonMailingList, CaseMailingList


def add_to_common_mailchimp_list(email: str):
    """Добавляет email в общий лист рассылок"""
    add_mailchimp_email_with_tag(audience_name='COMMON', email=email, tag='COMMON TAG')

    CommonMailingList.objects.get_or_create(email=email)


def add_to_case_mailchimp_list(email: str, case_id: Union[int, str]):
    """Добавляет email в лист рассылок по делу"""

    case = Case.objects.get(pk=case_id)
    case_tag = f'Case {case.name}'

    add_mailchimp_email_with_tag(audience_name='CASES', email=email, tag=case_tag)

    CaseMailingList.objects.get_or_create(email=email, case=case)
