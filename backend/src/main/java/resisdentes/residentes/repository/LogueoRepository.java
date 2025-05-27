package resisdentes.residentes.repository;

import resisdentes.residentes.model.Logueo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogueoRepository extends JpaRepository<Logueo, Long> {
    Optional<Logueo> findByUsuarioAndContrasena(String usuario, String contrasena);
    Optional<Logueo> findByUsuario(String usuario);
}
