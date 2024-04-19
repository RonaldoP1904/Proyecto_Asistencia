$(document).ready( function () {
    
    $(".btn-eliminar").click(function (e){

        let $this = $(this);

        const response = confirm("¿Estás Seguro de Eliminar la Nota?");

        if(response){

            const id = $this.data("id")

            $.ajax({

                url: '/nota/del',
                type: 'DELETE',
                data: {id}

            }).done(function(){
                window.location.href = "/principal"
            }).fail(function(e) {
                alert( "Error al eliminar " + e.responseJSON.mensaje );
            })

        }


    })
})

app.delete('/delete-session/:userId', function(req, res) {
    const userId = req.params.userId;
    // Aquí iría tu lógica para eliminar la sesión del usuario basada en userId
    // Por ejemplo, eliminar el usuario de la base de datos

    // Simulamos una eliminación exitosa
    res.json({ success: true });
});