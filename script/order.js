
function Order(type, size, crust, topping) {
    this.type = type;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

//getting the price of crust
Order.prototype.getCrust = function () {
    if (this.crust === 0) {
        return 200
    } else if (this.crust === 1) {
        return 150
    } else if (this.crust === 2) {
        return 180
    }
}

//getting the price of topping
Order.prototype.getTopping = function () {
    if (this.topping === 0) {
        return 100
    } else if (this.topping === 1) {
        return 150
    } else if (this.topping === 2) {
        return 100
    } else if (this.topping === 3) {
        return 200
    }
    else if (this.topping === 4) {
        return 100
    }
    
}


//getting the price of pizza size
Order.prototype.getSize = function () {

    var count = $("#topping :selected").length;  //topppings array

    // alert(count);

    if (this.type == 0) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 900
        else {
            return 1400
        }
        // alert(count);
    } else if (this.type == 1) {
        if (count === 0) {
            return 350
        } else if (count === 1)
            return 850
        else {
            return 1800
        }
        // alert(count);
    } else if (this.type == 2) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 1000
        else {
            return 2500
        }
        // alert(count);
    } else if (this.type == 3) {
        if (count === 0) {
            return 600
        } else if (count === 1)
            return 1500
        else {
            return 2500
        }
        // alert(count);
    } else if (this.type == 4) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 950
        else {
            return 2000
        }
    } else if (this.type == 5) {
        if (count === 0) {
            return 400
        } else if (count === 1)
            return 850
        else {
            return 2200
        }
    } else {
        return false;
    }
}


//calculating the total cost of pizza
function totalBill() {
    var sum = 0;
    $(".billPerOrder").each(function () {
        var value = $(this).text();
        if (!isNaN(value) && value.length != 0) {
            sum += parseFloat(value);
        }
    });
    if (document.getElementById('yes').checked) {
        var result = "Your order is Ksh. " + sum + " delivery charge is 100ksh";
        var orderBill = sum + 100;
        var total = "Total: Ksh. " + orderBill + " .00";
        $('#result').text(result);
        $('#totalCost').text(total);

        swal({
            title: "Your order is ready for delivery to your Address",
        })

    } else {
        var total = "Total: Ksh. " + sum + " .00";
        $('#totalCost').text(total)
    }
}

//checking out
function checkout() {
    swal({
        title: "You have successfully placed your order." + "\r\n" + "Thank You Customer",
    }).then((value) => {
        Address.reload();
    });
}
//navigation
$(document).ready(function () {
    
   $('.nav_icon').click(function (){
       $('.sidebar').toggle();
   })
   

   $(window). resize(function(){
       $('.sidebar').hide();
   })  
   
    //display the address for delivery
    $('.radioBtn').change(function () {
        if (document.getElementById("yes").checked) {
            $('.Address').show();
        } else {
            $('.Address').hide();
        }
    });

    $('#addToCart').click(function () {
        var type = $('#type option:selected').val();
        var size = $('#size option:selected').val();
        var crust = $('#crust option:selected').val();
        var quantity = $('#quantity').val();
        var topping = $('#topping option:selected').val();
        var name = $('#name').val();

        //validations of input fields
        if (type == '' || size == '' || crust == '' || topping == '' || quantity == '' || name == '') {
            alert('Fill in all fields to complete an order')
        } else if (document.getElementById("yes").checked && $('#location').val() == '') {
            alert('Please fill out your Address')
        } else {
            var selectedType = parseInt($('#type option:selected').val());
            var selectedSize = parseInt($('#size option:selected').val());
            var selectedCrust = parseInt($('#crust option:selected').val());
            var quantity = parseInt($('#quantity').val());
            var selectedTopping = parseInt($('#topping option:selected').val());
            var newOrder = new Order(selectedType, selectedSize, selectedCrust, selectedTopping);

            //total selling price per of everyh order
            var theBill = (newOrder.getSize() + newOrder.getCrust() + newOrder.getTopping()) * quantity;

            //append the data to the table
            $('.displayOrder').show();
            $(".table tbody:last").append("<tr>" +
                "<td>" + $('#type option:selected').text() + "</td>" +
                "<td>" + $('#size option:selected').text() + "</td>" +
                "<td>" + $('#crust option:selected').text() + "</td>" +
                "<td>" + $('#topping option:selected').text() + "</td>" +
                "<td>" + $('#quantity').val() + "</td>" +
                "<td><span class='billPerOrder'>" + theBill + "</span></td>" +
                "</tr>");
            $(totalBill);
        }
    })
    $('#checkout').click(function () {
        checkout();
    })
})
