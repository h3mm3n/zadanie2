function calculate(amount, interest, maturity) {
    var table = $('#months');
    table.empty();
    var vat_amount = amount * 1.2;
    var bank_service = vat_amount * 0.016; 
    var credit = vat_amount + bank_service; 
    var monthly_paid = credit / maturity; 
    for (var month = 1; month <= maturity; month++) {
        var row = $('<tr></tr>');
        function cell(value, round) {
            if (isNaN(value) || !isFinite(value))
                value = 'ошибка';
            else if (round)
                value = Math.ceil(value);
            else {
                var c = Math.ceil(value * 100) / 100;
                var r = Math.floor(c);
                var coins = Math.ceil((c - r) * 100);
                coins = ',' + (coins + '00').slice(0, 2);
                coins = '<span>' + coins + '</span>';
                value = Math.floor(value) + coins;
            }
            $('<td></td>').html(value)
                    .appendTo(row);
        }
        cell(month, true);
        cell(credit);
        var loan = credit * interest / 100; 
        cell(loan);
        cell(monthly_paid);
        var monthly_fee = monthly_paid + loan;
        cell(monthly_fee);
        credit -= monthly_paid;
        cell(month < maturity ? credit : 0);
        table.append(row);
    }
}

function reset() {
    var list = location.hash ? location.hash.slice(1) : false;
    list = list ? list.split('|') : [];
    $('#amount').val(  list[0] || localStorage['amount']   || 5000);
    $('#interest').val(list[1] || localStorage['interest'] || 3);
    $('#maturity').val(list[2] || localStorage['maturity'] || 6);
    if (0 == list.length) {
        if ('year' == localStorage['interest_term'])
            $('#interest_term').val('year');
        if ('year' == localStorage['maturity_unit'])
            $('#maturity_unit').val('year');
    }
}

$(document).ready(function() {
    reset();
    $('#reset').click(reset);
    $('#credit').submit(function(e) {
        e.preventDefault();
        var interest = $('#interest').val();
        interest = interest.replace(',', '.');
        if ('year' == $('#interest_term').val())
            interest /= 12;
        var maturity = $('#maturity').val();
        if ('year' == $('#maturity_unit').val())
            maturity *= 12;
        calculate($('#amount').val(), interest, maturity);
        e.isDefaultPrevented = true;
    });
});

$(window).unload(function() {
    localStorage['amount'] = $('#amount').val();
    localStorage['interest'] = $('#interest').val();
    localStorage['maturity'] = $('#maturity').val();
    localStorage['interest_term'] = $('#interest_term').val();
    localStorage['maturity_unit'] = $('#maturity_unit').val();
});

    // Показать полупрозрачный DIV, чтобы затенить страницу
    // (форма располагается не внутри него, а рядом, потому что она не должна быть полупрозрачной)
  
    