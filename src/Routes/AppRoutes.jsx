import React from "react";
import { Route, Routes } from "react-router-dom";
import { TablaCarrera } from "../Components/TablaCarrera/TablaCarrera";
import { CucsPage } from "../Pages/Coordinador/CucsPage";
import { TablaGrupos } from "../Components/TablaGrupos/TablaGrupos";
import { GruposPage } from "../Pages/Escolar/GruposPage";
import { SeleccionCarreraPage } from "../Pages/Consejero/SeleccionCarreraPage";
import { HomePage } from "../Pages/HomePage";
import { ConsejerosPage } from "../Pages/Administrativo/ConsejerosPage";
import { Login } from "../Components/Login/Login";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { FacilitadoresPage } from "../Pages/Administrativo/FacilitadoresPage";
import { SeleccionFacilitadorPage } from "../Pages/Consejero/SeleccionFacilitadorPage";
import { CarrerasPage } from "../Pages/Coordinador/CarrerasPage";
import { NotFoundPage } from "../Pages/NotFoundPage";
import { OlvidoContra } from "../Components/OlvidoContra/OlvidoContra";
import { EscolaresPage } from "../Pages/Administrativo/EscolaresPage";
import { PeriodosPage } from "../Pages/Coordinador/PeriodosPage";
import { MateriasPage } from "../Pages/Coordinador/MateriasPage";
import { EstudiantesPage } from "../Pages/Escolar/EstudiantesPage";
import { ClasesPage } from "../Pages/Escolar/ClasesPage";
import { AsignarClaseEstudiantes } from "../Pages/Escolar/AsignarClaseEstudiantes";
import { CalificarClasesPage } from "../Pages/Facilitador/CalificarClasesPage";
import { MateriasEnCursoPage } from "../Pages/Estudiante/MateriasEnCursoPage";
import { BoletasPage } from "../Pages/Estudiante/BoletasPage";
import { ClasesCalificadasRevision } from "../Pages/Escolar/ClasesCalificadasRevision";
import { HomePageEscolar } from "../Pages/Escolar/HomePageEscolar";
import { HomePageCoordinador } from "../Pages/Coordinador/HomePageCoordinador";
import { KardexPage } from "../Pages/Estudiante/KardexPage";
import { DatosGeneralesPage } from "../Pages/Coordinador/DatosGeneralesPage";
import { ValidarGrupoParaReporte } from "../Pages/Escolar/ValidarGrupoParaReporte";
import { ReportesRecibidos } from "../Pages/Coordinador/ReportesRecibidos";



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Login />} />
        <Route path='/olvidoContra' element={<OlvidoContra/>} />
        
      </Route>
      {/* <Route element={<PrivateRoutes />}>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/homePageCoordinador" element={<HomePageCoordinador />} />
        <Route path="/homePageEscolar" element={<HomePageEscolar />} />
        <Route path="/cucs" element={<CucsPage />} />
        <Route path="/carreras" element={<CarrerasPage />} />
        <Route path="/facilitadores" element={<FacilitadoresPage />} />
        <Route path="/grupos" element={<GruposPage />} />
        <Route path="/seleccionCarreras" element={<SeleccionCarreraPage />} />
        <Route path="/seleccionFacilitadores" element={<SeleccionFacilitadorPage />} />
        <Route path="/grupos/tablagrupos" element={<TablaGrupos />} />
        <Route path="/consultar-carreras" element={<TablaCarrera />} />
        <Route path="/consejeros" element={<ConsejerosPage />} />
        <Route path="/escolares" element={<EscolaresPage />} />
        <Route path="/periodos" element={<PeriodosPage />} />
        <Route path="/materias" element={<MateriasPage />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/clases" element={<ClasesPage />} />
        <Route path="/asignarClaseEstudiante" element={<AsignarClaseEstudiantes />} />
        <Route path="/clasesCalificadasRevision" element={<ClasesCalificadasRevision/>} />
        <Route path="/calificarClases" element={<CalificarClasesPage/>} />
        <Route path="/materiasCursando" element={<MateriasEnCursoPage/>} />
        <Route path="/boletas" element={<BoletasPage/>} />
        <Route path="/kardex" element={<KardexPage/>} />
        <Route path="/datosGenerales" element={<DatosGeneralesPage/>} />
        <Route path="/validarGrupoParaReporte" element={<ValidarGrupoParaReporte/>} />
        <Route path="/reportesRecibidos" element={<ReportesRecibidos/>} />
      </Route> */}

      <Route
        path="/homePage"
        element={<PrivateRoutes element={<HomePage />} />}
      />

      {/* Coordinador */}
      <Route
        path="/homePageCoordinador"
        element={<PrivateRoutes element={<HomePageCoordinador />} requiredRole="coordinador" />}
      />
      <Route
        path="/cucs"
        element={<PrivateRoutes element={<CucsPage />} requiredRole="coordinador" />}
      />
      <Route
        path="/carreras"
        element={<PrivateRoutes element={<CarrerasPage />} requiredRole="coordinador" />}
      />
      <Route
        path="/periodos"
        element={<PrivateRoutes element={<PeriodosPage />} requiredRole="coordinador" />}
      />
      <Route
        path="/materias"
        element={<PrivateRoutes element={<MateriasPage />} requiredRole="coordinador" />}
      />
      <Route
        path="/datosGenerales"
        element={<PrivateRoutes element={<DatosGeneralesPage />} requiredRole="coordinador" />}
      />
      <Route
        path="/reportesRecibidos"
        element={<PrivateRoutes element={<ReportesRecibidos />} requiredRole="coordinador" />}
      />

      {/* Administrativo */}
      <Route
        path="/consejeros"
        element={<PrivateRoutes element={<ConsejerosPage />} requiredRole="administrativo" />}
      />
      <Route
        path="/facilitadores"
        element={<PrivateRoutes element={<FacilitadoresPage />} requiredRole="administrativo" />}
      />
      <Route
        path="/escolares"
        element={<PrivateRoutes element={<EscolaresPage />} requiredRole="administrativo" />}
      />

      {/* consejero */}
      <Route
        path="/homePageConsejero"
        element={<PrivateRoutes element={<HomePageEscolar/>} requiredRole="consejero" />}
      />
      <Route
        path="/seleccionCarreras"
        element={<PrivateRoutes element={<SeleccionCarreraPage/>} requiredRole="consejero" />}
      />
      <Route
        path="/seleccionFacilitadores"
        element={<PrivateRoutes element={<SeleccionFacilitadorPage/>} requiredRole="consejero" />}
      />


      {/* escolar */}
      <Route
        path="/homePageEscolar"
        element={<PrivateRoutes element={<HomePageEscolar />} requiredRole="escolar" />}
      />
      <Route
        path="/grupos"
        element={<PrivateRoutes element={<GruposPage />} requiredRole="escolar" />}
      />
      <Route
        path="/estudiantes"
        element={<PrivateRoutes element={<EstudiantesPage />} requiredRole="escolar" />}
      />
      <Route
        path="/clases"
        element={<PrivateRoutes element={<ClasesPage />} requiredRole="escolar" />}
      />
      <Route
        path="/asignarClaseEstudiante"
        element={<PrivateRoutes element={<AsignarClaseEstudiantes />} requiredRole="escolar" />}
      />
      <Route
        path="/clasesCalificadasRevision"
        element={<PrivateRoutes element={<ClasesCalificadasRevision />} requiredRole="escolar" />}
      />
      <Route
        path="/validarGrupoParaReporte"
        element={<PrivateRoutes element={<ValidarGrupoParaReporte />} requiredRole="escolar" />}
      />
    {/* facilitador*/}
    <Route
        path="/calificarClases"
        element={<PrivateRoutes element={<CalificarClasesPage />} requiredRole="facilitador" />}
      />


    {/* estudiante*/}
      <Route
        path="/materiasCursando"
        element={<PrivateRoutes element={<MateriasEnCursoPage />} requiredRole="estudiante" />}
      />
      <Route
        path="/boletas"
        element={<PrivateRoutes element={<BoletasPage />} requiredRole="estudiante" />}
      />
      <Route
        path="/kardex"
        element={<PrivateRoutes element={<KardexPage />} requiredRole="estudiante" />}
      />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
