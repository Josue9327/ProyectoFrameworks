-- ================================================================================
-- SCHEMA: Sistema de Consultorio Médico
-- Descripción: Base de datos para gestión de consultas médicas, pacientes,
--              doctores, citas, tratamientos y recetas médicas
-- Autor: Alicia, Josue y Natalia | Sistema VitalCore
-- Fecha: 2026
-- ================================================================================

-- Creación del esquema principal
-- DROP SCHEMA public;
CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- ================================================================================
-- SECCIÓN: SECUENCIAS
-- Descripción: Secuencias para generación automática de IDs
-- Configuración: Incremento de 50 para optimización de batch inserts
-- ================================================================================

-- Secuencia para identificadores de citas médicas
CREATE SEQUENCE public.cita_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de doctores
CREATE SEQUENCE public.doctor_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de frases (sistema de mensajes)
CREATE SEQUENCE public.frase_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de historial médico
CREATE SEQUENCE public.historial_medico_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de recetas médicas
CREATE SEQUENCE public.receta_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de tipos de cita
CREATE SEQUENCE public.tipo_cita_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- Secuencia para identificadores de tratamientos
CREATE SEQUENCE public.tratamiento_id_seq
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 100
	NO CYCLE;

-- ================================================================================
-- SECCIÓN: TABLAS PRINCIPALES
-- Descripción: Entidades base del sistema (sin dependencias externas)
-- ================================================================================

-- -------------------------------------------------------------------------------
-- Tabla: DOCTOR
-- Descripción: Almacena información de los médicos del consultorio
-- Campos principales: 
--   - id_doctor: Identificador único del doctor
--   - especialidad: Especialidad médica del doctor
--   - correo/password: Credenciales de acceso al sistema
-- -------------------------------------------------------------------------------
CREATE TABLE public.doctor (
	id_doctor int8 NOT NULL,
	apmat varchar(50) NOT NULL,           -- Apellido materno
	appat varchar(50) NOT NULL,           -- Apellido paterno
	correo varchar(100) NOT NULL,         -- Email del doctor (login)
	especialidad varchar(50) NOT NULL,    -- Especialidad médica
	nombre varchar(50) NOT NULL,          -- Nombre(s) del doctor
	"password" varchar(100) NOT NULL,     -- Contraseña encriptada
	telefono varchar(50) NOT NULL,        -- Teléfono de contacto
	CONSTRAINT doctor_pkey PRIMARY KEY (id_doctor)
);

-- -------------------------------------------------------------------------------
-- Tabla: PACIENTE
-- Descripción: Almacena información de los pacientes del consultorio
-- Campos principales:
--   - id_paciente: Identificador único del paciente
--   - fecha_nacimiento: Fecha de nacimiento para cálculo de edad
--   - correo/password: Credenciales de acceso al sistema
-- -------------------------------------------------------------------------------
CREATE TABLE public.paciente (
	id_paciente int8 NOT NULL,
	apmat varchar(50) NOT NULL,           -- Apellido materno
	appat varchar(50) NOT NULL,           -- Apellido paterno
	correo varchar(100) NOT NULL,         -- Email del paciente (login)
	direccion varchar(100) NOT NULL,      -- Dirección física
	fecha_nacimiento date NOT NULL,       -- Fecha de nacimiento
	nombre varchar(50) NOT NULL,          -- Nombre(s) del paciente
	"password" varchar(100) NOT NULL,     -- Contraseña encriptada
	telefono varchar(15) NOT NULL,        -- Teléfono de contacto
	CONSTRAINT paciente_pkey PRIMARY KEY (id_paciente)
);

-- -------------------------------------------------------------------------------
-- Tabla: TIPOCITA
-- Descripción: Catálogo de tipos de citas disponibles
-- Ejemplos: Consulta general, Consulta especializada, Seguimiento, Urgencia
-- -------------------------------------------------------------------------------
CREATE TABLE public.tipocita (
	id_tipo_cita int8 NOT NULL,
	descripcion varchar(255) NOT NULL,    -- Descripción detallada del tipo de cita
	nombre varchar(255) NOT NULL,         -- Nombre del tipo de cita
	CONSTRAINT tipocita_pkey PRIMARY KEY (id_tipo_cita)
);

-- ================================================================================
-- SECCIÓN: TABLAS DEPENDIENTES
-- Descripción: Tablas con relaciones a otras entidades
-- ================================================================================

-- -------------------------------------------------------------------------------
-- Tabla: CITA
-- Descripción: Registro de citas médicas programadas
-- Relaciones:
--   - doctor: Médico asignado a la cita
--   - paciente: Paciente que solicita la cita
--   - tipocita: Tipo de consulta médica
-- Reglas de negocio:
--   - Una cita debe tener un doctor, paciente y tipo asignados
--   - La fecha y hora son obligatorias
-- -------------------------------------------------------------------------------
CREATE TABLE public.cita (
	id_cita int8 NOT NULL,
	fecha date NOT NULL,                  -- Fecha de la cita
	hora time(6) NOT NULL,                -- Hora de la cita
	id_doctor int8 NOT NULL,              -- FK: Doctor asignado
	id_paciente int8 NOT NULL,            -- FK: Paciente
	id_tipo_cita int8 NOT NULL,           -- FK: Tipo de cita
	CONSTRAINT cita_pkey PRIMARY KEY (id_cita),
	CONSTRAINT fk19htl4sg98j1how2ixicfkox7 FOREIGN KEY (id_doctor) 
		REFERENCES public.doctor(id_doctor),
	CONSTRAINT fk3yo27at446g46enfdxol94jib FOREIGN KEY (id_tipo_cita) 
		REFERENCES public.tipocita(id_tipo_cita),
	CONSTRAINT fksi7sc4te2dd8osp2qexn9279j FOREIGN KEY (id_paciente) 
		REFERENCES public.paciente(id_paciente)
);

-- -------------------------------------------------------------------------------
-- Tabla: HISTORIALMEDICO
-- Descripción: Historial médico del paciente (información de salud general)
-- Relación: 1:1 con paciente (un paciente tiene un único historial)
-- Campos opcionales: Permite valores NULL para flexibilidad en el registro
-- -------------------------------------------------------------------------------
CREATE TABLE public.historialmedico (
	id_historial_medico int8 NOT NULL,
	adicciones varchar(255) NULL,         -- Registro de adicciones (tabaco, alcohol, etc.)
	alergias varchar(255) NULL,           -- Alergias conocidas del paciente
	discapacidades varchar(255) NULL,     -- Discapacidades físicas o mentales
	enfermedades_cronicas varchar(255) NULL, -- Enfermedades crónicas (diabetes, hipertensión, etc.)
	id_paciente int8 NOT NULL,            -- FK: Paciente (relación 1:1)
	CONSTRAINT historialmedico_pkey PRIMARY KEY (id_historial_medico),
	CONSTRAINT ukm7tn8pfad7ctfqjhbf0n3h7fg UNIQUE (id_paciente), -- Garantiza relación 1:1
	CONSTRAINT fkqw62xtbh5nduwwakbk49iptwj FOREIGN KEY (id_paciente) 
		REFERENCES public.paciente(id_paciente)
);

-- -------------------------------------------------------------------------------
-- Tabla: TRATAMIENTO
-- Descripción: Tratamiento médico resultante de una cita
-- Relación: 1:1 con cita (una cita puede generar un tratamiento)
-- Propósito: Almacenar el diagnóstico y prescripción médica
-- -------------------------------------------------------------------------------
CREATE TABLE public.tratamiento (
	id_tratamiento int8 NOT NULL,
	diagnostico varchar(200) NOT NULL,    -- Diagnóstico médico de la consulta
	id_cita int8 NOT NULL,                -- FK: Cita asociada (relación 1:1)
	CONSTRAINT tratamiento_pkey PRIMARY KEY (id_tratamiento),
	CONSTRAINT uksry6y5iwkl7da9l3jjgxppxj3 UNIQUE (id_cita), -- Garantiza relación 1:1
	CONSTRAINT fki5qg87ilh8b8i1cx7oo21madu FOREIGN KEY (id_cita) 
		REFERENCES public.cita(id_cita)
);

-- -------------------------------------------------------------------------------
-- Tabla: RECETA
-- Descripción: Recetas médicas (prescripción de medicamentos)
-- Relación: N:1 con tratamiento (un tratamiento puede tener múltiples recetas)
-- Propósito: Detallar los medicamentos prescritos con sus dosis
-- -------------------------------------------------------------------------------
CREATE TABLE public.receta (
	id_receta int8 NOT NULL,
	dosis varchar(50) NOT NULL,           -- Dosis prescrita (ej: "500mg cada 8 horas")
	medicamento varchar(100) NOT NULL,    -- Nombre del medicamento
	id_tratamiento int8 NOT NULL,         -- FK: Tratamiento asociado
	CONSTRAINT receta_pkey PRIMARY KEY (id_receta),
	CONSTRAINT fkdsj9fpbhpqxn24a2yi8ixu47a FOREIGN KEY (id_tratamiento) 
		REFERENCES public.tratamiento(id_tratamiento)
);

-- ================================================================================
-- SECCIÓN: FUNCIONES
-- Descripción: Funciones de utilidad para administración de base de datos
-- ================================================================================

-- -------------------------------------------------------------------------------
-- Función: disable_replication_role
-- Descripción: Desactiva el rol de replicación de un usuario
-- Parámetros:
--   - username: Nombre del usuario PostgreSQL
-- Validaciones:
--   - Verifica que el usuario exista
--   - Verifica que no haya slots activos de replicación
-- Seguridad: SECURITY DEFINER (ejecuta con privilegios del propietario)
-- -------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.disable_replication_role(username text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Verificar que el rol exista
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = username) THEN
    RAISE EXCEPTION 'Role % does not exist', username;
  END IF;
  
  -- Verificar que no haya slots activos de replicación
  IF EXISTS (SELECT usename FROM pg_stat_replication where usename = username) THEN 
    RAISE EXCEPTION 'There are active slots associated with % role', username; 
  END IF;
  
  -- Remover privilegios de replicación
  EXECUTE format('ALTER ROLE %I WITH NOREPLICATION', username);
  RETURN username;
END
$function$;

-- -------------------------------------------------------------------------------
-- Función: enable_replication_role
-- Descripción: Habilita el rol de replicación de un usuario
-- Parámetros:
--   - username: Nombre del usuario PostgreSQL
-- Validaciones:
--   - Verifica que el usuario exista
--   - Verifica que no tenga ya privilegios de replicación
-- Seguridad: SECURITY DEFINER (ejecuta con privilegios del propietario)
-- -------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.enable_replication_role(username text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$ 
BEGIN 
  -- Verificar que el rol exista
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = username) THEN
    RAISE EXCEPTION 'Role % does not exist', username;
  END IF;
  
  -- Verificar que no tenga ya privilegios de replicación
  IF (SELECT rolreplication FROM pg_roles WHERE rolname = username) THEN
    RAISE EXCEPTION 'Role % already has replication', username;
  END IF;
  
  -- Otorgar privilegios de replicación
  EXECUTE format('ALTER ROLE %I WITH REPLICATION', username);
  RETURN username;
END 
$function$;

-- ================================================================================
-- FIN DEL SCRIPT
-- ================================================================================
