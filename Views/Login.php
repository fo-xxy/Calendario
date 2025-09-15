<!doctype html>
<html>

<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Iniciar sesión</title>
    <link href='https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css' rel='stylesheet'>
    <link href='' rel='stylesheet'>
    <link type="text/css" rel="stylesheet" href="../Css/Style.css" />

</head>

<body oncontextmenu='return false' class='snippet-body'>
    <section class="body">
        <div class="container">
            <div class="login-box">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="logo">
                            <span class="logo-font"></span>Bievenido
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <br>
                        <h3 class="header-title">Iniciar sesión</h3>
                        <form class="login-form">
                            <div class="form-group">
                                <input type="text" class="form-control" id="inputEmail" placeholder="Correo" required value="usuario@dominio.com">
                            </div>
                            <div class="form-group">
                                <input type="Password" class="form-control" id="inputPassword" placeholder="Contraseña" required value="clave123">

                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" id="btnLogin">Entrar</button>
                            </div>

                        </form>

                    </div>
                    <div class="col-sm-6 hide-on-mobile">
                        <div id="demo" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                            <!--<ul class="carousel-indicators">
                                <li data-target="#demo" data-slide-to="0" class="active"></li>
                                <li data-target="#demo" data-slide-to="1"></li>
                            </ul>-->
                            <!-- The slideshow -->
                            <!--<div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="slider-feature-card">
                                        <img src="https://i.imgur.com/YMn8Xo1.png" alt="">
                                        <h3 class="slider-title">Title Here</h3>
                                        <p class="slider-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, odio!</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="slider-feature-card">
                                        <img src="https://i.imgur.com/Yi5KXKM.png" alt="">
                                        <h3 class="slider-title">Title Here</h3>
                                        <p class="slider-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, debitis?</p>
                                    </div>
                                </div>
                            </div>-->
                            <!-- Left and right controls -->
                            <!--<a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'></script>
    <script type='text/javascript' src='https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js'></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../Js/Usuarios/Login.js"></script>
</body>

</html>