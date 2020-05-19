$(function frmotpr(){
var field = new Array("first_name",
    "second_name",
    "birth_date",
    "phone_number",
    "email",
    "city",
    "is_jewroot");

$("#registration_form").submit(function () {
    var error = 0;
    $("#registration_form").find(":input").each(function () {
        for (var i = 0; i < field.length; i++) {
            if ($(this).attr("name") == field[i]) {
                if (!$(this).val()) {
                    $(this).addClass('notvalid');
                    error = 1;
                }
                else {
                    $(this).removeClass('notvalid');
                }
            }
        }
    })
    if (error == 0) {
        return true;
    } else {
        var err_text = "";
        if (error == 1) err_text = "what a fuck?";
        $("#messenger").html(err_text);
        $("#messenger").fadeIn("slow");
        return false;
    }
})
    });