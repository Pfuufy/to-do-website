
// Apparently, having a unique ID for each item is not actually necessary. However, it is useful for testing
// to keep track of particular items. 
var mainCtrl = (function() {

    var vars = {
        id: 0
    };

    document.getElementById('addBtn').onclick = function() {
            domCtrl.addListItem();  
    };
    
    document.onkeypress = function(e) {
        if (e.which === 13 || e.keyCode === 13) {
            domCtrl.addListItem();
        }
    };

    return {

        getId: function() {
            vars.id++;
            return vars.id;
        },

        init: function() {
            document.getElementById('input').focus();
        }
    }
    
})();


var domCtrl = (function() {

    var id;
    
    id = mainCtrl.getId();
   

    var addItem = function() {
        var input, item, delBtn, pipe, checkBox, text;        
    
        input = document.getElementById('input');
        inVal = input.value;
    
        item = document.createElement('div');
        item.className = 'addItem';
        item.id = id;
    
        delBtn = document.createElement('button');
        delBtn.className = 'delBtn';
        delBtn.innerText = 'Delete';
        delBtn.onclick = delItem;
    
        pipe = document.createElement('span');
        pipe.innerText = '|'
    
        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'checkbox';
        checkBox.onclick = changeStatus;
    
        text = document.createElement('span');
        text.innerText = inVal;
        text.className = 'text';
    
        if (inVal !== '' && inVal !== ' ') {
            item.appendChild(delBtn);
            item.appendChild(pipe);
            item.appendChild(checkBox);
            item.appendChild(text);
        
            document.getElementById('list').appendChild(item);
            
            // For some reason, inVal doesn't get reset to the empty string, but input.value does even though they are equal. 
            input.value = '';
            input.focus();
        }
    };

    var changeStatus = function() {
        var div;
        div = this.parentNode;    
    
        if (this.checked) {
            document.getElementById('list').removeChild(div);
            document.getElementById('completed').appendChild(div);
        } else {
            document.getElementById('completed').removeChild(div);
            document.getElementById('list').appendChild(div);
        }
    };

    var delItem = function() {
        var parent, child;
        parent = this.parentNode.parentNode;
        child = this.parentNode;
        parent.removeChild(child);
    };

    return {

        addListItem: addItem,
    }

})();


mainCtrl.init();