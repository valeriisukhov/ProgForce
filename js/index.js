$(document).ready(function(){
    var currentIndex = 0;
    var editIndex = 0;
    var list = [];
    function addContactsToTable(list){
        $("#contactsBody").empty();
        currentIndex = 0;
        for (var i = 0; i < list.length; i++){
            appendToTable(list[i], i);
            currentIndex++;
        }
    };
    var clearNewContactForm = function(){
        $("#newContactLastName").val("");
        $("#newContactFirstName").val("");
        $("#newContactMobile").val("");
        $("#newContactEmail").val("");
        $("#newContactBirth").val("");
    };
    var appendToTable = function(item, i){
        $("#contactsBody")
            .append($('<tr>')
                .append($('<td>').text(i+1)
                    .addClass("col-md-1"))
                .append($('<td>').text(item.firstName)
                    .addClass("col-md-1"))
                .append($('<td>').text(item.lastName)
                    .addClass("col-md-1"))
                .append($('<td>').text(item.email)
                    .addClass("col-md-1"))
                .append($('<td>').text(item.mobilePhone)
                    .addClass("col-md-1"))
                .append($('<td>').text(item.birth)
                    .addClass("col-md-1"))
                .append($('<td>').addClass("col-md-1")
                    .append($('<button rel="'+item.id+'">').text("Edit")
                        .addClass("btn btn-default btn-block editContact")
                )
            )
        );
    }
    $("#saveNewContact").on("click", function(){
        var contactDto = {
            lastName: $("#newContactLastName").val().trim(),
            firstName: $("#newContactFirstName").val().trim(),
            mobilePhone: $("#newContactMobile").val().trim(),
            email: $("#newContactEmail").val().trim(),
            birth: $("#newContactBirth").val().trim()
        };
        if (!validateForm(contactDto)){
            $("#errorMessage").show();
            return;
        }
        list.push(contactDto);
        appendToTable(contactDto, currentIndex);
        currentIndex++;
        clearNewContactForm();
        $("#errorMessage").hide();
    });
    $("#contactsBody").on("click", ".editContact", function(){
        var contactId = $(this).attr('rel');
        var indexInList = $(this).parent().parent().children(":nth-child(1)").text();
        clearNewContactForm();
        $("#newContactLastName").val(list[indexInList-1].lastName);
        $("#newContactFirstName").val(list[indexInList-1].firstName);
        $("#newContactMobile").val(list[indexInList-1].mobilePhone);
        $("#newContactEmail").val(list[indexInList-1].email);
        $("#newContactBirth").val(list[indexInList-1].birth);
        $("#currentContactId").val(contactId);
        $("#saveNewContact").hide();
        $("#editContact").show();
        editIndex = indexInList-1;
    });
    $("#editContact").on("click", function(){
        $("#errorMessage").hide();
        var contactDto = {
            lastName: $("#newContactLastName").val().trim(),
            firstName: $("#newContactFirstName").val().trim(),
            mobilePhone: $("#newContactMobile").val().trim(),
            email: $("#newContactEmail").val().trim(),
            birth: $("#newContactBirth").val().trim()
        };
        if (!validateForm(contactDto)){
            $("#errorMessage").show();
            return;
        }
        clearNewContactForm();
        editTableAfterContactUpdate(contactDto);
        showAllContacts();
        $("#errorMessage").hide();
        $("#saveNewContact").show();
        $("#editContact").hide();
    });
    var editTableAfterContactUpdate = function(contactDto){
        var item = list[editIndex];
        item.lastName = contactDto.lastName;
        item.firstName = contactDto.firstName;
        item.mobilePhone = contactDto.mobilePhone;
        item.email = contactDto.email;
        item.birth = contactDto.birth;
    };
    var showAllContacts = function(){
        if (list.length === 0){
            return;
        }
        addContactsToTable(list);
    };
    $("#newWinner").on("click", function(){
        var self = $("#winner");
        var random = list[Math.floor(Math.random() * list.length)];
        self.html("<strong>Name: </strong>" + random.firstName + " " + random.lastName + ", <strong>Email:</strong>" + random.email);
        if (random.mobilePhone){
            self.append(", <strong>Phone:</strong> " + random.mobilePhone)
        }
        if (random.birth){
            self.append(", <strong>Birth Date:</strong> " + random.birth)
        }
    });
    function validateForm(dto){
        var result = false;
        if (!dto.firstName || !dto.lastName || !dto.email || dto.firstName.length < 3 || dto.lastName.length < 3){
            return result;
        }
        var emailPattern = new RegExp("^([a-zA-Z0-9_.-]+)@([a-z]+)(\\.)([a-z]{1,10})(\\.){0,1}([a-z]{0,3})$");
        result = emailPattern.test(dto.email);
        if (!result){
            return result;
        }
        var phonePattern = new RegExp("^\\+[3]{1}[8]{1}[0]{1}[0-9]{9,9}$");
        if (dto.mobilePhone){
            result = phonePattern.test(dto.mobilePhone);
        }
        return result;
    }
});