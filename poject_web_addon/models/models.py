from datetime import timedelta, date
from odoo import models, fields, api


class project_mod_tasks(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
    kanban_state = fields.Selection([
        ('normal', 'En progreso'),
        ('sinasignar', 'Sin Asignar'),
        ('done', 'Preparada'),
        ('blocked', 'Bloqueada'),
        ('atrasada','Atrasada')],
        string='Kanban State',
        copy=False, 
        default='sinasignar', 
        required=True)
    

## Añadir etapas contenidas en project_task_type.xml
class ProjectTaskType(models.Model):
    _inherit = 'project.task.type'

    case_default = fields.Boolean(
        string='Por Defecto en todos los proyectos',
        help='Las siguientes etapas son eneradas por defecto en todos los proyectos')
    
class ProjectProject(models.Model):
    _inherit = 'project.project'

    def _get_default_type_common(self):
        ids = self.env['project.task.type'].search([
            ('case_default', '=', True)])
        return ids

    type_ids = fields.Many2many(
        default=lambda self: self._get_default_type_common())
    
## Añadir tareas por defecto a todos los proyectos creados
class Project_default_task(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    @api.model
    def create(self, vals):
        project = super(Project_default_task, self).create(vals)
        task_vals = [{
            'name': 'Análisis',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Diagrama E/R',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Casos de uso',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Mockups',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Despliegue',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Manual de usuario',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }]
        self.env['project.task'].create(task_vals)
        return project

    def _get_default(self):
        ids = self.env["project.task.type"].search([("active", "=", True)])
        return ids
    
    type_ids = fields.Many2many(default=lambda self: self._get_default())