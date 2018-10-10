<template>
    <li class="collection-item">
        <form action="">
          <p>
            <label>
              <input type="checkbox" v-model="task.completed" @click="completeTask(task.id)" />
              <span>{{task.title}}</span>
            </label>
          </p>
        </form>
        <span class="title">{{task.description}}</span>
    </li>    
</template>


<script>
    import axios from 'axios';
    import Storage from './../classes/Storage.js';

    export default {
        data () {
            return {
                
            }
        },
        methods: {
            completeTask(id) {
                this.task.completed = !this.task.completed;

                if(navigator.onLine){
                    axios.put(api + '/tasks', this.task)
                        .then(res => {
                            this.$emit('taskCompleted');
                        })
                }else{
                    Storage.update('tasks', id, this.task);
                    Storage.set('synced', false);
                    this.$emit('taskCompleted');
                }
            }
        },
        props: [
            "task"
        ]
    }
</script>

<style>

</style>
