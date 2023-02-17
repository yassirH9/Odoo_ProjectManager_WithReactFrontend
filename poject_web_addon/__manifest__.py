# -*- coding: utf-8 -*-
{
    'name': "PojectWebAddon",

    'summary': """
        Modulo para añadir un endpoint y modificaciones al modulo de proyecto""",

    'description': """
        Modulo para añadir un endpoint y modificaciones al modulo de proyecto
    """,

    'author': "Yassir",
    'website': "",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','project'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'data/project_task_type.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'application': 'True',
}
