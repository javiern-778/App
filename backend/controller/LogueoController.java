package resisdentes.residentes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import resisdentes.residentes.model.Logueo;
import resisdentes.residentes.repository.LogueoRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/logueo")
@CrossOrigin(origins = "*")
public class LogueoController {

    @Autowired
    private LogueoRepository logueoRepository;

    // Iniciar sesión
    @PostMapping("/iniciar")
    public String iniciarSesion(@RequestBody Logueo datos) {
        Optional<Logueo> usuarioEncontrado = logueoRepository.findByUsuarioAndContrasena(
                datos.getUsuario(), datos.getContrasena()
        );

        if (usuarioEncontrado.isPresent()) {
            return "Inicio de sesión exitoso";
        } else {
            return "Usuario o contraseña incorrectos";
        }
    }

    // Registrar usuario
    @PostMapping("/registrar")
    public Logueo registrar(@RequestBody Logueo nuevoUsuario) {
        return logueoRepository.save(nuevoUsuario);
    }

    // Consultar todos los usuarios
    @GetMapping("/todos")
    public List<Logueo> obtenerTodos() {
        return logueoRepository.findAll();
    }

    // Consultar usuario por nombre de usuario
    @GetMapping("/buscar")
    public ResponseEntity<Logueo> buscarPorUsuario(@RequestParam String usuario) {
        Optional<Logueo> usuarioEncontrado = logueoRepository.findByUsuario(usuario);

        return usuarioEncontrado
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
