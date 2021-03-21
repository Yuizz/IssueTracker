def standard_response(data=None,links=None, errors=None):
    res = {
    'data': data if data else None,
    'links': links if links else None,
    'errors': errors if errors else None
    }
    return res
