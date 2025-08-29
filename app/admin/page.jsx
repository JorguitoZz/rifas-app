'use client'

import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/index'
import CreateRaffleModal from '@/components/CreateRaffleModal'

const Admin = () => {
  const [raffles, setRaffles] = useState([])
  const [selectedRaffle, setSelectedRaffle] = useState(null)
  const [purchasers, setPurchasers] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const res = await fetch('/api/raffles')
        const data = await res.json()
        setRaffles(data)
      } catch (error) {
        console.error('❌ Error al cargar rifas:', error)
      }
    }

    fetchRaffles()
  }, [])

  const handleConfirmPurchase = (purchaserId) => {
    setPurchasers((prev) =>
      prev.map((p) =>
        p.id === purchaserId ? { ...p, confirmed: true } : p
      )
    )
  }

  const handleExportRaffle = (raffle) => {
    const headers = [
      'Comprador',
      'Cédula',
      'Email',
      'Método de Pago',
      'Monto',
      'Números Asignados',
      'Fecha',
      'Estado'
    ]

    const rows = purchasers.map((p) => [
      p.buyerName,
      p.buyerCedula,
      p.buyerEmail,
      p.paymentMethod,
      p.amount,
      p.assignedNumbers.join(', '),
      p.paymentDate,
      p.confirmed ? 'Confirmado' : 'Pendiente'
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Rifa_${raffle.name}_compradores.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'pago-movil':
        return 'bg-blue-500'
      case 'zelle':
        return 'bg-green-500'
      case 'binance':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Render vista de compradores si hay una rifa seleccionada
    if (selectedRaffle) {
  return (
    <div className="min-h-screen bg-[#1e1e24] text-white p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedRaffle(null)}
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-white">
            Compradores – {selectedRaffle.name}
          </h1>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {selectedRaffle.soldTickets}
              </div>
              <p className="text-xs text-gray-500">
                de {selectedRaffle.totalTickets} tickets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${selectedRaffle.soldTickets * selectedRaffle.ticketPrice}
              </div>
              <p className="text-xs text-gray-500">USD recaudados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fecha Límite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {selectedRaffle.drawDate}
              </div>
              <p className="text-xs text-gray-500">Sorteo programado</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de compradores */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white">Compradores</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Método de Pago</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Números Asignados</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasers.map((purchaser) => (
                  <TableRow key={purchaser.id}>
                    <TableCell className="font-medium">
                      {purchaser.buyerName}
                    </TableCell>
                    <TableCell>{purchaser.buyerCedula}</TableCell>
                    <TableCell>{purchaser.buyerEmail}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${getPaymentMethodColor(
                          purchaser.paymentMethod
                        )} text-white`}
                      >
                        {purchaser.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>${purchaser.amount}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {purchaser.assignedNumbers.map((num, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border border-gray-500 text-gray-400"
                          >
                            {num.toString().padStart(4, '0')}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{purchaser.paymentDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          purchaser.confirmed ? 'default' : 'secondary'
                        }
                      >
                        {purchaser.confirmed ? 'Confirmado' : 'Pendiente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!purchaser.confirmed && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            handleConfirmPurchase(purchaser.id)
                          }
                        >
                          Confirmar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}

  // Render principal del panel
  return (
    <>
      <div className="min-h-screen bg-[#1e1e24] text-white p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Crear Rifa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raffles.map((raffle) => (
              <Card key={raffle.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <img
                  src={raffle.image_url}
                  alt={raffle.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold">{raffle.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Premio:</span>
                    <span className="font-medium">{raffle.prize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Precio:</span>
                    <span className="font-medium">${raffle.ticket_price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Vendidos:</span>
                    <span className="font-medium">
                      {raffle.total_tickets - raffle.available_tickets}/{raffle.total_tickets}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Estado:</span>
                    <Badge variant={raffle.status === 'active' ? 'default' : 'secondary'}>
                      {raffle.status === 'active' ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setSelectedRaffle(raffle)}>
                    Ver Compradores
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center gap-1"
                      onClick={() => handleExportRaffle(raffle)}
                    >
                      Exportar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 flex items-center gap-1"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateRaffleModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  )
}

export default Admin
