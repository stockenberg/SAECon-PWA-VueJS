class Storage{

    /**
     * Add to LocalStorage
     * @param {*} key 
     * @param {*} value 
     */
    static add(key, value) {
        let storage = this.get(key);
        if(storage !== null){
            if(Array.isArray(storage)){
                storage.push(value)
            }else{
                storage = [storage];
            }
            this.set(key, storage);
        }else{
            this.set(key, value);
        }
    }

    /**
     * Writes an Item into Storage
     * @param {*} key 
     * @param {*} value 
     */
    static set(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Get from LocalStorage
     * @param {*} key 
     */
    static get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * Searches an Item by ID in given Storage
     * @param {*} key 
     * @param {*} id 
     */
    static find(key, id) {
        let storage = this.get(key);
        for(let item of storage){
            return (item.id === id) ? item : null;
        }
    }
    /**
     * Finds an Entry in Storage and updates it with given updatedItem
     * @param {*} key 
     * @param {*} id 
     * @param {*} updatedItem 
     */
    static update(key, id, updatedItem){
        let storage = this.get(key);
       
        for(let entry in storage){
            if(storage[entry].id === id){                
                storage[entry] = updatedItem;
            }
        }
        this.set(key, storage);
    }

    static synced(value) {
        this.set('synced', value);
    }

    static isSynced(){
        return this.get('synced');
    }
}

export default Storage;