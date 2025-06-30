import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Main App component for the interactive cybersecurity checklist
const App = () => {
    // Initial checklist data
    // This data structure includes all the details for each security item.
    const initialChecklist = [
        { id: 1, category: 'I. Protección de Borde y Red', subcategory: 'AWS WAF', item: 'Reglas gestionadas (Managed Rules) activadas (OWASP Top 10, bot control, etc.).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 2, category: 'I. Protección de Borde y Red', subcategory: 'AWS WAF', item: 'Reglas personalizadas implementadas (rate limiting, geobloqueo, etc.).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 3, category: 'I. Protección de Borde y Red', subcategory: 'AWS WAF', item: 'WAF configurado en modo de bloqueo para reglas críticas.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 4, category: 'I. Protección de Borde y Red', subcategory: 'AWS WAF', item: 'Logs de WAF integrados con Security Hub/GuardDuty/sistema de logs centralizado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 5, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'DNSSEC habilitado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 6, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'HTTPS/TLS forzado (TLS 1.2+).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 7, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'Certificados TLS válidos implementados y con rotación automatizada.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 8, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'CDN configurada para no cachear contenido sensible.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 9, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'Origen de la CDN (NLB) configurado para aceptar tráfico solo de la CDN.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 10, category: 'I. Protección de Borde y Red', subcategory: 'DNS y CDN', item: 'Protección DDoS de la CDN activa y configurada.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 11, category: 'I. Protección de Borde y Red', subcategory: 'Capa DSSL', item: 'Terminación TLS configurada en el punto adecuado.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 12, category: 'I. Protección de Borde y Red', subcategory: 'Capa DSSL', item: 'Solo suites de cifrado modernas y fuertes habilitadas.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 13, category: 'I. Protección de Borde y Red', subcategory: 'Capa DSSL', item: 'HSTS (HTTP Strict Transport Security) implementado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 14, category: 'I. Protección de Borde y Red', subcategory: 'Red', item: 'Componentes backend en subredes privadas.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 15, category: 'I. Protección de Borde y Red', subcategory: 'Red', item: 'Grupos de Seguridad (Security Groups) con el principio de mínimo privilegio.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 16, category: 'I. Protección de Borde y Red', subcategory: 'Red', item: 'Listas de Control de Acceso de Red (NACLs) implementadas.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 17, category: 'I. Protección de Borde y Red', subcategory: 'Red', item: 'VPC Flow Logs habilitados y monitoreados.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 18, category: 'II. Autenticación y Autorización', subcategory: 'Cognito', item: 'MFA (Multi-Factor Authentication) forzado para todos los usuarios.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 19, category: 'II. Autenticación y Autorización', subcategory: 'Cognito', item: 'Políticas de contraseñas fuertes configuradas.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 20, category: 'II. Autenticación y Autorización', subcategory: 'Cognito', item: 'Protección de cuentas (detección de riesgo, bloqueo, CAPTCHA).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 21, category: 'II. Autenticación y Autorización', subcategory: 'Cognito', item: 'Flujos de registro/recuperación/cambio de contraseña seguros y validados.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 22, category: 'II. Autenticación y Autorización', subcategory: 'Cognito', item: 'Scoping de tokens (OAuth/OIDC) limitado.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 23, category: 'II. Autenticación y Autorización', subcategory: 'Bastion Authenticator', item: 'MFA obligatorio para el acceso al Bastion.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 24, category: 'II. Autenticación y Autorización', subcategory: 'Bastion Authenticator', item: 'Acceso Just-In-Time (JIT) implementado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 25, category: 'II. Autenticación y Autorización', subcategory: 'Bastion Authenticator', item: 'Todas las sesiones y comandos a través del Bastion logueados y auditados.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 26, category: 'II. Autenticación y Autorización', subcategory: 'Bastion Authenticator', item: 'Principio de Mínimo Privilegio aplicado para los permisos del Bastion.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 27, category: 'II. Autenticación y Autorización', subcategory: 'Bastion Authenticator', item: 'Bastion host endurecido (OS actualizado, políticas de seguridad CIS).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 28, category: 'III. Gestión de APIs y Microservicios', subcategory: 'API Gateway', item: 'Validación de esquemas de entrada de API habilitada.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 29, category: 'III. Gestión de APIs y Microservicios', subcategory: 'API Gateway', item: 'Integración con Authorizers (Cognito/Lambda) para control de acceso.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 30, category: 'III. Gestión de APIs y Microservicios', subcategory: 'API Gateway', item: 'Rate limiting y throttling configurados.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 31, category: 'III. Gestión de APIs y Microservicios', subcategory: 'API Gateway', item: 'Cifrado en tránsito (HTTPS/TLS) entre API Gateway y backends.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 32, category: 'III. Gestión de APIs y Microservicios', subcategory: 'API Gateway', item: 'Access Logging detallado habilitado.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 33, category: 'III. Gestión de APIs y Microservicios', subcategory: 'Lambda', item: 'Roles de IAM de mínimo privilegio asignados a cada función Lambda.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 34, category: 'III. Gestión de APIs y Microservicios', subcategory: 'Lambda', item: 'Validación estricta de todas las entradas a las funciones.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 35, category: 'III. Gestión de APIs y Microservicios', subcategory: 'Lambda', item: 'Secretos gestionados con AWS Secrets Manager/Parameter Store (no hardcodeados).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 36, category: 'III. Gestión de APIs y Microservicios', subcategory: 'Lambda', item: 'Funciones Lambda configuradas dentro de una VPC privada.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 37, category: 'III. Gestión de APIs y Microservicios', subcategory: 'Lambda', item: 'Análisis de seguridad estático (SAST) y dinámico (DAST) aplicado al código Lambda.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 38, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Uso de imágenes Docker base mínimas y seguras.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 39, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Escaneo de vulnerabilidades de imágenes Docker integrado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 40, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Roles de tareas de IAM con mínimo privilegio para los contenedores.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 41, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Proceso de parches y actualización de librerías dentro de los contenedores.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 42, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Políticas de red (Grupos de Seguridad) para restringir la comunicación.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 43, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Secretos accedidos vía Secrets Manager/Parameter Store.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 44, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Logging detallado de contenedores centralizado.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 45, category: 'III. Gestión de APIs y Microservicios', subcategory: 'ECS Fargate', item: 'Límites de recursos (CPU, memoria) configurados para contenedores.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 46, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Cifrado en reposo habilitado para todas las BB.DD. y buckets S3 (KMS).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 47, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Cifrado en tránsito (SSL/TLS) forzado para todas las conexiones.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 48, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Grupos de Seguridad restringiendo el acceso solo a servicios autorizados.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 49, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Usuarios/roles de BB.DD. con el principio de mínimo privilegio.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 50, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Motores de BB.DD. actualizados con los últimos parches de seguridad.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 51, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Backups automáticos, cifrados y con retención adecuada.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 52, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Logs de auditoría de BB.DD. habilitados y revisados.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 53, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Políticas de Bucket S3 estrictas, bloqueando acceso público.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 54, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'RDS, ElastiCache, S3', item: 'Versionamiento S3 habilitado.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 55, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'IP Whitelisting o VPC Peering para restringir acceso.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 56, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'Autenticación fuerte (SCRAM-SHA-256) y TLS/SSL forzado.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 57, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'Control de Acceso Basado en Roles (RBAC) implementado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 58, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'Logs de auditoría de actividad habilitados y revisados.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 59, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'Backups cifrados y plan de restauración probado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 60, category: 'IV. Bases de Datos y Almacenamiento', subcategory: 'MongoDB Atlas Cluster', item: 'Mantenimiento de versiones y parches de seguridad de Atlas.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 61, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'S3 (Mach Build)', item: 'Acceso restringido con IAM Roles de mínimo privilegio.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 62, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'S3 (Mach Build)', item: 'Artefactos cifrados en reposo y transferencias vía HTTPS.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 63, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'S3 (Mach Build)', item: 'Escaneo de vulnerabilidades integrado en el pipeline de CI/CD para artefactos.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 64, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'Reglas de protección de ramas (revisiones, pruebas CI).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 65, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'MFA forzado para todos los usuarios de GitHub.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 66, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'Proceso de revisión de código (Code Review) implementado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 67, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'GitHub Secret Scanning habilitado.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 68, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'Dependabot/Alertas de seguridad de GitHub habilitadas para dependencias.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 69, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'Permisos de GitHub Actions/Integraciones con mínimo privilegio.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 70, category: 'V. Proceso de Build/Deploy (CI/CD)', subcategory: 'GitHub', item: 'Segregación de entornos (dev/staging/prod) en el pipeline de CI/CD.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 71, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Logging Centralizado', item: 'Todos los logs enviados a un sistema centralizado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 72, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Logging Centralizado', item: 'Retención de logs adecuada definida y aplicada.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 73, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Monitoreo y Alertas', item: 'Alertas configuradas para actividades sospechosas y umbrales de seguridad.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 74, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Monitoreo y Alertas', item: 'Integración con CloudWatch, GuardDuty, Security Hub.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 75, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Gestión de Incidentes', item: 'Plan de Respuesta a Incidentes (IRP) documentado y comunicado.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 76, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Gestión de Incidentes', item: 'Ejercicios de mesa (tabletop exercises) y simulacros de incidentes.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 77, category: 'VI. Observabilidad y Respuesta a Incidentes', subcategory: 'Gestión de Incidentes', item: 'Canales de comunicación para incidentes claramente definidos.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 78, category: 'VII. Gestión de Identidades y Acceso (IAM en AWS)', subcategory: 'Políticas de IAM', item: 'Aplicación estricta del Principio de Mínimo Privilegio (PoLP).', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 79, category: 'VII. Gestión de Identidades y Acceso (IAM en AWS)', subcategory: 'Políticas de IAM', item: 'Uso de Roles de IAM preferido sobre credenciales de usuario.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 80, category: 'VII. Gestión de Identidades y Acceso (IAM en AWS)', subcategory: 'Políticas de IAM', item: 'MFA forzado para todos los usuarios de la consola y usuarios programáticos AWS.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 81, category: 'VII. Gestión de Identidades y Acceso (IAM en AWS)', subcategory: 'Políticas de IAM', item: 'Revisión periódica de permisos de IAM.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 82, category: 'VII. Gestión de Identidades y Acceso (IAM en AWS)', subcategory: 'Políticas de IAM', item: 'Políticas de acceso condicional implementadas (si aplica).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 83, category: 'VIII. Otros Aspectos Clave', subcategory: 'Pruebas de Seguridad', item: 'Pruebas de Penetración (Pen Testing) realizadas periódicamente.', priority: 'Crítica', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 84, category: 'VIII. Otros Aspectos Clave', subcategory: 'Pruebas de Seguridad', item: 'Escaneos de vulnerabilidades continuos (aplicación e infraestructura).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 85, category: 'VIII. Otros Aspectos Clave', subcategory: 'Pruebas de Seguridad', item: 'Revisiones de seguridad del código y configuraciones (IaC).', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 86, category: 'VIII. Otros Aspectos Clave', subcategory: 'Gestión Vulnerabilidades', item: 'Proceso robusto para la aplicación de parches de seguridad.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 87, category: 'VIII. Otros Aspectos Clave', subcategory: 'Gestión Vulnerabilidades', item: 'Programa de gestión de vulnerabilidades continuo implementado.', priority: 'Alta', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 88, category: 'VIII. Otros Aspectos Clave', subcategory: 'Conciencia y Entrenamiento', item: 'Entrenamiento regular en codificación segura para desarrolladores.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
        { id: 89, category: 'VIII. Otros Aspectos Clave', subcategory: 'Conciencia y Entrenamiento', item: 'Programas de concientización de seguridad para todo el equipo.', priority: 'Media', status: 'Pendiente', responsible: '', dueDate: '', notes: '' },
    ];

    // State to hold the current checklist items
    const [checklist, setChecklist] = useState(initialChecklist);
    // State to hold the current filter status (e.g., 'All', 'Completado', 'Pendiente', 'Revisado')
    const [filterStatus, setFilterStatus] = useState('All');
    // State for LLM response
    const [llmResponse, setLlmResponse] = useState('');
    // State to manage LLM loading indicator
    const [isLoadingLlm, setIsLoadingLlm] = useState(false);
    // State to control visibility of the LLM suggestion modal
    const [showLlmModal, setShowLlmModal] = useState(false);
    // State to store the item text for which LLM suggestion is being generated
    const [currentLlmItemText, setCurrentLlmItemText] = useState('');
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');
    // State for sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    // Options for the status dropdown, now including 'Revisado'
    const statusOptions = ['Pendiente', 'En Progreso', 'Revisado', 'Completado', 'No Aplicable'];

    // Function to handle status change for a checklist item
    const handleStatusChange = (id, newStatus) => {
        setChecklist(prevChecklist =>
            prevChecklist.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    // Function to call Gemini API for suggestions
    const handleGetSuggestion = async (itemText) => {
        setCurrentLlmItemText(itemText);
        setLlmResponse(''); // Clear previous response
        setIsLoadingLlm(true);
        setShowLlmModal(true);

        try {
            let chatHistory = [];
            const prompt = `Proporciona pasos de mitigación detallados o siguientes pasos para el siguiente ítem de ciberseguridad: "${itemText}". Sé conciso y directo.`;
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // If you want to use models other than gemini-2.0-flash, provide an API key here. Otherwise, leave this as-is.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setLlmResponse(text);
            } else {
                setLlmResponse('No se pudo obtener una sugerencia. Inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setLlmResponse('Error al conectar con el servicio de sugerencias. Por favor, verifica tu conexión.');
        } finally {
            setIsLoadingLlm(false);
        }
    };

    // Memoized filtered and sorted checklist
    const sortedAndFilteredChecklist = useMemo(() => {
        let currentList = [...checklist];

        // Apply search filter
        if (searchQuery) {
            currentList = currentList.filter(item =>
                item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'All') {
            currentList = currentList.filter(item => item.status === filterStatus);
        }

        // Apply sorting
        if (sortConfig.key !== null) {
            currentList.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return currentList;
    }, [checklist, filterStatus, searchQuery, sortConfig]);

    // Calculate summary statistics based on the full checklist (not filtered/sorted)
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => item.status === 'Completado').length;
    const pendingItems = checklist.filter(item => item.status === 'Pendiente').length;
    const inProgressItems = checklist.filter(item => item.status === 'En Progreso').length;
    const reviewedItems = checklist.filter(item => item.status === 'Revisado').length;
    const notApplicableItems = checklist.filter(item => item.status === 'No Aplicable').length;
    const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    // Data for the Pie Chart
    const chartData = [
        { name: 'Pendiente', value: pendingItems, color: '#EF4444' }, // Red
        { name: 'En Progreso', value: inProgressItems, color: '#F59E0B' }, // Amber
        { name: 'Revisado', value: reviewedItems, color: '#8B5CF6' }, // Purple
        { name: 'Completado (Ok)', value: completedItems, color: '#10B981' }, // Green
        { name: 'No Aplicable', value: notApplicableItems, color: '#6B7280' }, // Gray
    ].filter(data => data.value > 0); // Only show slices with values greater than 0

    // Helper function to get status-based styling
    const getStatusClass = (status) => {
        switch (status) {
            case 'Completado':
                return 'bg-green-100 text-green-800'; // Green for completed (your "Ok")
            case 'Pendiente':
                return 'bg-red-100 text-red-800';     // Red for pending
            case 'En Progreso':
                return 'bg-yellow-100 text-yellow-800'; // Yellow for in progress
            case 'Revisado':
                return 'bg-purple-110 text-purple-800'; // Purple for reviewed
            case 'No Aplicable':
                return 'bg-gray-100 text-gray-800';   // Gray for not applicable
            default:
                return '';
        }
    };

    // Helper function to get priority-based styling
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Crítica':
                return 'bg-red-200 text-red-900 font-semibold';
            case 'Alta':
                return 'bg-orange-200 text-orange-900 font-medium';
            case 'Media':
                return 'bg-yellow-200 text-yellow-900';
            case 'Baja':
                return 'bg-blue-200 text-blue-900';
            default:
                return '';
        }
    };

    // Function to request sorting
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Helper to get sort indicator
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
            {/* Tailwind CSS CDN for styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Recharts CDN for charting */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.1.8/recharts.min.js"></script>
            {/* Configure Tailwind to use 'Inter' font and custom purple shade */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .bg-purple-110 {
                    background-color: #ede9fe; /* A slightly darker purple-100 */
                }
                `}
            </style>

            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 lg:p-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Checklist de Ciberseguridad en Proyecto No Clientes Consumo
                    </span>
                </h1>

                {/* Summary and Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-center">
                    {/* Summary Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-5 shadow-sm border border-blue-200">
                            <p className="text-sm font-medium text-blue-700">Total de Ítems</p>
                            <p className="text-3xl font-bold text-blue-900">{totalItems}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-5 shadow-sm border border-green-200">
                            <p className="text-sm font-medium text-green-700">Completados (Ok)</p>
                            <p className="text-3xl font-bold text-green-900">{completedItems}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-green-600 mt-1">{completionPercentage.toFixed(1)}% completado</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-5 shadow-sm border border-purple-200">
                            <p className="text-sm font-medium text-purple-700">Revisados</p>
                            <p className="text-3xl font-bold text-purple-900">{reviewedItems}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-5 shadow-sm border border-yellow-200">
                            <p className="text-sm font-medium text-yellow-700">En Progreso</p>
                            <p className="text-3xl font-bold text-yellow-900">{inProgressItems}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-5 shadow-sm border border-red-200">
                            <p className="text-sm font-medium text-red-700">Pendientes</p>
                            <p className="text-3xl font-bold text-red-900">{pendingItems}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200">
                            <p className="text-sm font-medium text-gray-700">No Aplicable</p>
                            <p className="text-3xl font-bold text-gray-900">{notApplicableItems}</p>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="lg:col-span-1 bg-white rounded-lg p-4 shadow-md border border-gray-200 flex flex-col items-center justify-center min-h-[250px]">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Estado de la Revisión</h3>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}> {/* Increased height */}
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60} // Larger inner radius for donut effect
                                        outerRadius={100} // Larger outer radius
                                        fill="#8884d8"
                                        dataKey="value"
                                        animationBegin={800} // Animation starts after 800ms
                                        animationDuration={1000} // Animation duration 1000ms
                                        isAnimationActive={true}
                                        // Label outside the pie, with a line
                                        label={({ cx, cy, midAngle, outerRadius, percent, name }) => {
                                            const RADIAN = Math.PI / 180;
                                            const radius = outerRadius + 10; // Distance from pie
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                            return (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    fill={chartData.find(d => d.name === name)?.color || '#333'}
                                                    textAnchor={x > cx ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                    className="text-xs font-medium"
                                                >
                                                    {`${name} (${(percent * 100).toFixed(0)}%)`}
                                                </text>
                                            );
                                        }}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={1} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
                                                    <p className="font-semibold text-gray-900">{data.name}</p>
                                                    <p className="text-gray-700">Ítems: {data.value}</p>
                                                    <p className="text-gray-700">Porcentaje: {(data.percent * 100).toFixed(1)}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }} />
                                    <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
                                    {/* Central text for overall completion */}
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold text-gray-900">
                                        {`${completionPercentage.toFixed(0)}%`}
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500 text-center">No hay datos para mostrar en el gráfico.</p>
                        )}
                    </div>
                </div>


                {/* Filter and Search Section */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-between items-center">
                    {/* Search Input */}
                    <div className="w-full sm:w-auto flex-grow">
                        <input
                            type="text"
                            placeholder="Buscar por ítem, categoría o subcategoría..."
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                        {['All', 'Pendiente', 'En Progreso', 'Revisado', 'Completado', 'No Aplicable'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                    ${filterStatus === status
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }
                                    whitespace-nowrap
                                    `}
                            >
                                {status === 'All' ? 'Todos' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Checklist Table */}
                <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150 rounded-tl-lg max-w-[100px]"
                                    onClick={() => requestSort('category')}
                                >
                                    Categoría {getSortIndicator('category')}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150 max-w-[150px]"
                                    onClick={() => requestSort('subcategory')}
                                >
                                    Subcategoría {getSortIndicator('subcategory')}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                                    onClick={() => requestSort('item')}
                                >
                                    Ítem de Seguridad {getSortIndicator('item')}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                                    onClick={() => requestSort('priority')}
                                >
                                    Prioridad {getSortIndicator('priority')}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                                    onClick={() => requestSort('status')}
                                >
                                    Estado {getSortIndicator('status')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                                    Sugerencias ✨
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedAndFilteredChecklist.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                        No hay ítems que coincidan con los filtros o la búsqueda.
                                    </td>
                                </tr>
                            ) : (
                                sortedAndFilteredChecklist.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[100px] break-words">{item.category}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-[150px] break-words">{item.subcategory}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-lg break-words">{item.item}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(item.priority)}`}>
                                                {item.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2
                                                            ${getStatusClass(item.status)}`}
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleGetSuggestion(item.item)}
                                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                                            >
                                                ✨ Sugerencia
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* LLM Suggestion Modal */}
            {showLlmModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Sugerencia para:</h2>
                            <button
                                onClick={() => setShowLlmModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-3xl font-light"
                            >
                                &times;
                            </button>
                        </div>
                        <p className="text-lg font-semibold text-blue-700 mb-4">{currentLlmItemText}</p>
                        {isLoadingLlm ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                <p className="ml-4 text-gray-600">Generando sugerencia...</p>
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {llmResponse}
                            </div>
                        )}
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowLlmModal(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
