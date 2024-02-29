import confetti from 'https://cdn.skypack.dev/canvas-confetti';


        function handleReceipt(){
        var receiptUrl = window.location.href;
        var retryUrl = '';
        if(receiptUrl.includes('reference')){
            var query_string = receiptUrl.split('reference=');
            var ref_obj = atob(decodeURIComponent(query_string[1]));
            ref_obj = JSON.parse(ref_obj);
            
            if(ref_obj != undefined){
                if(ref_obj.paymentStatus == 'Payment Approved'){
                    document.getElementById('headertext').style = 'color:#2CB554;';
                    document.getElementById('headertext').innerHTML = 'Thank you !';
                    document.getElementById('redirectionmessage').innerHTML = 'Page will be redirected in 10 seconds.';
                    if(ref_obj.chargeType == 'OneTime'){
                        document.getElementById('subheadertext').innerHTML = 'Thank you for your generous donation of <b>$'+ref_obj.amount+'</b>. Here is your transaction id <b>'+ref_obj.paymentId+'</b>.';
                        document.getElementById('receiptBody').innerHTML = 'Your generous donation is deeply appreciated and will create a meaningful impact.';
                    }else{
                        var date = ref_obj.nextInstallmentDate;                        
                        var newDate = new Date(ref_obj.nextInstallmentDate.split('-')[0],ref_obj.nextInstallmentDate.split('-')[1],ref_obj.nextInstallmentDate.split('-')[2]);
                        const yyyy = newDate.getFullYear();
                        let mm = newDate.getMonth() + 1; // Months start at 0!
                        let dd = newDate.getDate();

                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;

                        const formattedToday = dd + '/' + mm + '/' + yyyy;
                        document.getElementById('subheadertext').innerHTML = 'Thank you for your <b>'+ref_obj.installPeriod.toLowerCase()+'</b> regular giving of <b>$'+ref_obj.amount+'</b> from <b>'+formattedToday+'</b>.';
                        document.getElementById('receiptBody').innerHTML = 'Your generous donation is deeply appreciated and will create a meaningful impact.';
                    }

                    confetti();
                    setTimeout(function(){
                      
                      let parentUrl = window.parent.location.href;
                      if(parentUrl.includes('https://wired-apps.github.io/wiredpayments/fundraiser/')){
                        window.parent.location.reload();
                      }else{
                        window.location.href='https://wired-apps.github.io/wiredpayments/fundraiser/';
                      }
                      
                    },10000);
                   
                }else{
                    document.getElementById('headertext').style = 'color:red;';
                    document.getElementById('headertext').innerHTML = 'Oh no....';
                    document.getElementById('subheadertext').innerHTML = 'We regret to inform you that your recent donation attempt of $'+ref_obj.amount+' was unsuccessful. Please click retry.';
                    document.getElementById('receiptBody').innerHTML = 'We apologize for any inconvenience this may have caused.';
                    document.getElementById('retryDiv').style= 'display:block';
                    document.getElementById('parentDiv').classList.remove('wrapper-1');
                    document.getElementById('parentDiv').classList.add('wrapper-error');
                    document.getElementById('socials').style="display:none;"
                    retryUrl = ref_obj.retryURL;
                }
          }
        }
      }

//window.addEventListener("message", makeConfetti)
window.addEventListener("message",function(){
    console.log('INSIDE');
})
