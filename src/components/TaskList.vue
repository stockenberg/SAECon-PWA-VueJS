<template>
  <div class="col s12">
    <div v-if="offline" class="offline-warning red darken-4">
      <h5 class="white-text center">you are offline :(</h5>
      <p class="white-text center">your data will be synced after you got a connection again</p>
    </div>
    <h5 class="header">Your Tasks</h5>
    <ul class="collection">
        <task v-for="(task, index) of tasks" v-if="!task.completed " :task="task" :key="index" @taskCompleted="fetchTasks()"></task>  
    </ul>
    <h5 class="header">Completed Tasks</h5>
    <ul class="collection">
        <task v-for="(task, index) of tasks" v-if="task.completed" :task="task" :key="index" @taskCompleted="fetchTasks()"></task>  
    </ul>
  </div>
</template>


<script>
  import axios from 'axios';
  import Storage from './../classes/Storage.js'
  import Task from './Task.vue'

  export default {
    data() {
      return {
        tasks: null,
        offline: false,
      }
    },
  
    mounted() {
      this.fetchTasks();
      window.addEventListener('offline', (ev) => {
          console.log(ev);
          this.offline = true;
      });

       window.addEventListener('online', () => {
          this.syncTaskList()
          this.offline = false;
      });

    },
    methods: {
      fetchTasks() {
        if (navigator.onLine) {
            this.getTasks();
        } else {
            this.getTasksFromStorage();
        }
      },
      getTasks() {
        axios.get(api + '/tasks')
          .then(res => {
            Storage.set('tasks', res.data);
            this.tasks = res.data;
            Storage.synced(true);
          })
          .catch(err => {
            this.getTasksFromStorage();
          })
      },
      getTasksFromStorage() {
        this.tasks = Storage.get("tasks")
      },
      syncTaskList() {
        if(!Storage.isSynced()){
          axios.put(api + '/syncTasks', {tasks: Storage.get('tasks')})
            .then(res => {
              this.getTasks();
            })
            .catch(err => {
              console.log(err);
            })
        }
      }
    },
    components: {Task}
  }

</script>

<style>
  .offline-warning {
    padding: 10px;
  }
  .header{
    padding: 10px 10px 10px 20px;
    color: #26a69a;
  }
</style>
