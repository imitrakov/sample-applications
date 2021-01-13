from typing import NamedTuple, List, Dict

import db


class Category(NamedTuple):
    """Структура категорий"""
    codename: str
    name: str
    is_base_expense: bool
    aliases: List[str]


class Categories:
    def __init__(self):
        self._categories = self._load_categories()

    def _load_categories(self) -> List[Category]:
        """Возвращает справочник категорий из таблицы"""
        categories = db.fetchall("category", "codename name is_base_expense aliases".split())
        categories = self._fill_aliases(categories)
        return categories

    def _fill_aliases(self, categories: List[Dict]) -> List[Category]:
        """Заполняет по каждой категории aliases, то есть возможные
               названия этой категории, которые можем писать в тексте сообщения.
               Например, категория «кафе» может быть написана как cafe,
               ресторан и тд."""
        result = []
        for index, category in enumerate(categories):
            aliases = category["aliases"].split(',')
            aliases = list(filter(None, map(str.strip, aliases)))
            aliases.append(category["codename"])
            aliases.append(category["name"])
            result.append(Category(
                codename=category['codename'],
                name=category['name'],
                is_base_expense=category['is_base_expense'],
                aliases=aliases
            ))
        return result

    def get_all_categories(self) -> List[Category]:
        """Возвращает список категорий"""
        return self._categories
