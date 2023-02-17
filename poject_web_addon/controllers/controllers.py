from odoo import http
from odoo.http import request

class TaskController(http.Controller):

    @http.route('/api/tasks/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        tasks_rec = request.env['project.task'].sudo().search([])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'project': rec.project_id.name,
                'user': rec.user_id.name,
                'stage_id': rec.stage_id,
                'stage': rec.stage_id.name,
                'status': rec.kanban_state_label,
                'description': rec.description,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['project.task']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'name': rec.name,
            'project': rec.project_id.name,
            'user': rec.user_id.name,
            'stage_id': rec.stage_id,
            'stage': rec.stage_id.name,
            'status': rec.kanban_state_label,
            'description': rec.description,
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/tasks/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["project.task"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/tasks/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        task_to_put = request.env["project.task"]
        rec = task_to_put.browse(rec_id).sudo().ensure_one()

        # Obtener el nuevo valor del kanban stage
        stage_id = data.get('stage_id')
        status_id = data.get('status')
        # Si el valor del kanban stage se especifica en la solicitud, actualizar la tarea
        if stage_id:
            # Modificar el valor del campo stage_id en la tarea
            rec.write({'stage_id': stage_id})
            # rec.write(data)
            # Actualizar otros campos de la tarea
        if status_id:
            rec.write({'kanban_state': status_id})
        
        rec.write(data)
        data = {'status': 200, 'response': True, 'message': 'Success'}
        return data
    #
    #------------------------------------------------------------------------------------------------
    #
    @http.route('/api/tasks/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["project.task"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/tasks/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["project.task"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_tasks = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_tasks.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/projectStage/getAll', auth='public',type="json",csrf=True, cors='*')
    def listProject(self, **kw):
        gestion_tareas_rec = request.env['project.task.type'].sudo().search([])
        gestion_tareas = []
        for rec in gestion_tareas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
            }
            gestion_tareas.append(vals)
        return {'status': 200, 'response': gestion_tareas, 'message': 'Success'}
