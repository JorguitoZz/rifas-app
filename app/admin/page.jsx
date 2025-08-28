// Ruta: app/admin/page.jsx

"use client";
import React, { useState } from "react";
// Se ajustó la ruta para ir desde 'app/admin/' a la carpeta 'src/components/ui'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/index";
import CreateRaffleModal from '@/components/CreateRaffleModal';

// Mock data (replace with your actual data source)
const raffles = [
    {
        id: "1",
        title: "Rifa del Auto del Año",
        prize: "Toyota Corolla 2024",
        ticketPrice: 25,
        totalTickets: 1000,
        soldTickets: 678,
        endDate: "2024-12-30",
        isActive: true,
        image: "https://images.unsplash.com/photo-1621295286591-5a046c8b939c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTkyMzF8MHwxfHNlYXJjaHwxNXx8Y2FyfGVufDB8fHx8MTY5OTY5NDgwMQ&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        id: "2",
        title: "Rifa de la Moto Deportiva",
        prize: "Kawasaki Ninja 400",
        ticketPrice: 15,
        totalTickets: 500,
        soldTickets: 450,
        endDate: "2024-11-15",
        isActive: true,
        image: "https://images.unsplash.com/photo-1558981403-c0d1645e5261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTkyMzF8MHwxfHNlYXJjaHwyMHx8bW90b3JjeWNsZXxlbnwwfHx8fDE2OTk2OTQ4MDE&ixlib=rb-4.0.3&q=80&w=1080"
    },
];

const mockPurchasers = [
    {
        id: "1",
        buyerName: "María González",
        buyerCedula: "12345678",
        buyerEmail: "maria@email.com",
        paymentMethod: "pago-movil",
        amount: 25,
        assignedNumbers: [123, 456, 789],
        paymentDate: "2024-01-15",
        confirmed: false
    },
    {
        id: "2",
        buyerName: "Carlos Rodríguez",
        buyerCedula: "87654321",
        buyerEmail: "carlos@email.com",
        paymentMethod: "zelle",
        amount: 50,
        assignedNumbers: [234, 567],
        paymentDate: "2024-01-16",
        confirmed: true
    },
    {
        id: "3",
        buyerName: "Ana Martínez",
        buyerCedula: "11223344",
        buyerEmail: "ana@email.com",
        paymentMethod: "binance",
        amount: 75,
        assignedNumbers: [345, 678, 901],
        paymentDate: "2024-01-17",
        confirmed: false
    }
];

const Admin = () => {
    const [selectedRaffle, setSelectedRaffle] = useState(null);
    const [purchasers, setPurchasers] = useState(mockPurchasers);

    const handleConfirmPurchase = (purchaserId) => {
        setPurchasers(prev =>
            prev.map(p =>
                p.id === purchaserId ? { ...p, confirmed: true } : p
            )
        );
    };

    const getPaymentMethodColor = (method) => {
        switch (method) {
            case 'pago-movil': return 'bg-blue-500';
            case 'zelle': return 'bg-green-500';
            case 'binance': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const [showCreateModal, setShowCreateModal] = useState(false);


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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver
                        </Button>
                        <h1 className="text-3xl font-bold text-white">
                            Compradores - {selectedRaffle.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Vendidos</CardTitle>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-5v-1a1 1 0 011-1h3a1 1 0 011 1v1zm-2-7a5 5 0 100-10 5 5 0 000 10z" />
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.485 0-4.5 2.015-4.5 4.5S9.515 17 12 17s4.5-2.015 4.5-4.5S14.485 8 12 8z" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    ${selectedRaffle.soldTickets * selectedRaffle.ticketPrice}
                                </div>
                                <p className="text-xs text-gray-500">
                                    USD recaudados
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Fecha Límite</CardTitle>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {selectedRaffle.endDate}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Sorteo programado
                                </p>
                            </CardContent>
                        </Card>
                    </div>

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
                                            <TableCell className="font-medium">{purchaser.buyerName}</TableCell>
                                            <TableCell>{purchaser.buyerCedula}</TableCell>
                                            <TableCell>{purchaser.buyerEmail}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={`${getPaymentMethodColor(purchaser.paymentMethod)} text-white`}>
                                                    {purchaser.paymentMethod}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>${purchaser.amount}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {purchaser.assignedNumbers.map((num, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs border border-gray-500 text-gray-400">
                                                            {num.toString().padStart(4, '0')}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>{purchaser.paymentDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={purchaser.confirmed ? "default" : "secondary"}>
                                                    {purchaser.confirmed ? 'Confirmado' : 'Pendiente'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {!purchaser.confirmed && (
                                                    <Button size="sm" variant="success" onClick={() => handleConfirmPurchase(purchaser.id)}>
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
        );
    }
    

    return (
        <>
        <div className="min-h-screen bg-[#1e1e24] text-white p-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Panel de Administración
                    </h1>
                    <Button
                        variant="default"
                        className="flex items-center gap-2"
                        onClick={() => setShowCreateModal(true)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                      Crear Rifa
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {raffles.map((raffle) => (
                        <Card key={raffle.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <img src={raffle.image} alt={raffle.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-bold">{raffle.title}</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Premio:</span>
                                    <span className="font-medium">{raffle.prize}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Precio:</span>
                                    <span className="font-medium">${raffle.ticketPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Vendidos:</span>
                                    <span className="font-medium">{raffle.soldTickets}/{raffle.totalTickets}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Estado:</span>
                                    <Badge variant={raffle.isActive ? "default" : "secondary"}>
                                        {raffle.isActive ? 'Activa' : 'Inactiva'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button className="w-full" onClick={() => setSelectedRaffle(raffle)}>
                                    Ver Compradores
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 01-1-1V6a1 1 0 011-1h5a1 1 0 011 1v10a1 1 0 01-1 1H3zm5-3a1 1 0 010 2h3a1 1 0 011-1V5a1 1 0 01-1-1h-3a1 1 0 01-1 1v8z" clipRule="evenodd" />
                                        </svg>
                                        Exportar
                                    </Button>
                                    <Button variant="destructive" size="sm" className="flex-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 8a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
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
    );
};

export default Admin;