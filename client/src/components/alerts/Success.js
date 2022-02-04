import swal from 'sweetalert'

export const Success=()=>{
      swal({
        title: "Good jobs!",
        text: "Successfully Saved!",
        icon: "success",
        buttons: 'Ok'
      });
}