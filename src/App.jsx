import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    superficie: '',
    tipoConstruccion: '',
    orientacion: '',
    aislacion: '',
    ventanas: ''
  })
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setResultado(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getEtiquetaColor = (etiqueta) => {
    const colors = {
      'A': 'bg-green-500',
      'B': 'bg-blue-500',
      'C': 'bg-yellow-500',
      'D': 'bg-red-500'
    }
    return colors[etiqueta] || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Calculadora de Eficiencia Energética
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="superficie" className="block text-sm font-medium text-gray-700">
              Superficie (m²)
            </label>
            <input
              type="number"
              name="superficie"
              id="superficie"
              value={formData.superficie}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="tipoConstruccion" className="block text-sm font-medium text-gray-700">
              Tipo de Construcción
            </label>
            <select
              name="tipoConstruccion"
              id="tipoConstruccion"
              value={formData.tipoConstruccion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="tradicional">Tradicional</option>
              <option value="prefabricada">Prefabricada</option>
              <option value="moderna">Moderna</option>
            </select>
          </div>

          <div>
            <label htmlFor="orientacion" className="block text-sm font-medium text-gray-700">
              Orientación
            </label>
            <select
              name="orientacion"
              id="orientacion"
              value={formData.orientacion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="este">Este</option>
              <option value="oeste">Oeste</option>
            </select>
          </div>

          <div>
            <label htmlFor="aislacion" className="block text-sm font-medium text-gray-700">
              Aislación
            </label>
            <select
              name="aislacion"
              id="aislacion"
              value={formData.aislacion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="basica">Básica</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label htmlFor="ventanas" className="block text-sm font-medium text-gray-700">
              Tipo de Ventanas
            </label>
            <select
              name="ventanas"
              id="ventanas"
              value={formData.ventanas}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="simples">Vidrio Simple</option>
              <option value="doble">Doble Vidrio</option>
              <option value="triple">Triple Vidrio</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Calculando...' : 'Calcular Eficiencia'}
          </button>
        </form>

        {resultado && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resultado:</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Etiqueta de Eficiencia:</span>
              <span className={`px-3 py-1 rounded-full text-white font-semibold ${getEtiquetaColor(resultado.etiqueta)}`}>
                {resultado.etiqueta}
              </span>
              {resultado.puntaje && (
                <span className="text-sm text-gray-500">
                  (Puntaje: {resultado.puntaje})
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
