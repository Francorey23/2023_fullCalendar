<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId, initialValues } from './eventUtils'
export default defineComponent({
    components: { FullCalendar },
    data() {
        return {
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ],
                initialView: 'dayGridMonth',
                initialEvents: initialValues,
                height: '100%',
                contentHeight: 'auto',
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.handleDateSelect
            },
            currentEvents: [],
            creatEvent: false,
            myEventObject:{
                id: 0,
                title: '',
                time_init: '',
                time_finish: '',
                start: '',
                event: '',
            },
            calendarApi: '',

        }
    },
    methods: {
        async handleDateSelect(selectInfo) {
            
            this.calendarApi = selectInfo.view.calendar
            this.myEventObject.start=selectInfo.startStr
            this.showModal()
            this.calendarApi.unselect()
            /* console.log(calendarApi)
            let title = 'TextMensage'
            if (this.createEvent) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                })
                this.createEvent = false 
            }*/
        },
        //mostrar la ventana modal
        showModal() {
            const modalElement = document.getElementById('exampleModal')
            const modal = new bootstrap.Modal(modalElement)
            modal.show()
        },
        async addEvent(){
            this.calendarApi.addEvent({
                id: createEventId(),
                title: this.myEventObject.title,
                start: this.myEventObject.start,
            })
            this.calendarApi.unselect()
            this.myEventObject.title = ''
            this.myEventObject.start = ''
            this.myEventObject.time_finish = ''
            this.myEventObject.time_init = ''
            this.myEventObject.event = ''
            


        }
    }
})
</script>
<template>
    <div>
        <FullCalendar :options="calendarOptions
            ">

        </FullCalendar>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div class="mb-3">
                                <small for="" class="text-start">Titulo del evento</small>
                                <input v-model="myEventObject.title" type="text" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <small for="" class="text-start">Evento</small>
                                <textarea v-model="myEventObject.event" placeholder="" class="form-control"
                                    id="message-text"></textarea>
                            </div>
                            <div class="mb-3">
                                <small for="" class="text-start">Hora de inicio</small>
                                <input v-model="myEventObject.time_init" type="time" class="form-control">
                            </div>
                            <div class="mb-3">
                                <small for="" class="text-start">Hora de Finalizacion</small>
                                <input v-model="myEventObject.time_finish" type="time" class="form-control">
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="addEvent()">crear Evento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>