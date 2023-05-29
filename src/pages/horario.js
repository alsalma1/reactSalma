export default function Horario() {
    return(
    <div id="containerhorario">
        <div class="card text-center">
        {/* <div class="card-header">
            Featured
        </div> */}
        <div class="card-body horariobody">
            <h5 class="card-title">Horario de apertura</h5>
            <div class="containerh">
                <div class="row">
                    <div class="col">Lunes</div>
                    <div class="col">20:00-23:00h</div>
                </div>
                <div class="row">
                    <div class="col">Martes</div>
                    <div class="col cerrado">cerrado</div>
                </div>
                <div class="row">
                    <div class="col">Miércoles</div>
                    <div class="col">12:00-23:00h</div>
                </div>
                <div class="row">
                    <div class="col">Jueves</div>
                    <div class="col">12:00-23:00h</div>
                </div>
                <div class="row">
                    <div class="col">Viernes</div>
                    <div class="col">13:00-00:00h</div>
                </div>
                <div class="row">
                    <div class="col">Sábado</div>
                    <div class="col">13:00-00:00h</div>
                </div>
                <div class="row">
                    <div class="col">Domingo</div>
                    <div class="col">12:00-23:00h</div>
                </div>
                
            </div>
            <a href="/carta" class="btn btn-primary">Ver la carta</a>
        </div>
        {/* <div class="card-footer text-muted">
            2 days ago
        </div> */}
        </div>
    </div>
    
    )
}