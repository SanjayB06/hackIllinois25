"use client"

import { useState } from "react"
import { CreditCard, DollarSign, Home, MapPin, ShoppingCart, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function AccountDetails({ updateFormData }: { updateFormData: (data: any) => void }) {
  const [accountDetails, setAccountDetails] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    budget: "medium",
    location: "urban",
    previousOrders: [
      { id: 1, name: "Pasta Primavera", date: "2023-02-15" },
      { id: 2, name: "Grilled Salmon", date: "2023-02-08" },
      { id: 3, name: "Vegetable Curry", date: "2023-02-01" },
    ],
    paymentMethods: [
      { id: 1, type: "Credit Card", last4: "4242", default: true },
      { id: 2, type: "PayPal", email: "alex@example.com", default: false },
    ],
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        default: true,
      },
    ],
  })

  const handleChange = (field: string, value: any) => {
    const newAccountDetails = {
      ...accountDetails,
      [field]: value,
    }
    setAccountDetails(newAccountDetails)
    updateFormData(newAccountDetails)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-green-200">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt={accountDetails.name} />
          <AvatarFallback className="bg-green-100 text-green-800 text-xl">
            {accountDetails.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-xl font-medium">{accountDetails.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">{accountDetails.email}</p>
          <div className="flex gap-2 mt-1">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
            >
              Premium Member
            </Badge>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700"
            >
              15 Orders
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium">Budget Preference</h3>
          </div>
          <div className="pl-7">
            <Label htmlFor="budget" className="sr-only">
              Budget
            </Label>
            <Select value={accountDetails.budget} onValueChange={(value) => handleChange("budget", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Economy (Under $10)</SelectItem>
                <SelectItem value="medium">Standard ($10-$20)</SelectItem>
                <SelectItem value="high">Premium ($20+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium">Location Type</h3>
          </div>
          <div className="pl-7">
            <Label htmlFor="location" className="sr-only">
              Location
            </Label>
            <Select value={accountDetails.location} onValueChange={(value) => handleChange("location", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urban">Urban (City)</SelectItem>
                <SelectItem value="suburban">Suburban</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-medium">Previous Orders</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 pl-7">
          {accountDetails.previousOrders.map((order) => (
            <Card key={order.id} className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                >
                  Reorder
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium">Payment Methods</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 pl-7">
            {accountDetails.paymentMethods.map((payment) => (
              <Card key={payment.id} className={`${payment.default ? "border-green-300 dark:border-green-700" : ""}`}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {payment.type === "Credit Card" ? (
                        <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{payment.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.last4 ? `•••• ${payment.last4}` : payment.email}
                      </p>
                    </div>
                  </div>
                  {payment.default && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                    >
                      Default
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Home className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium">Delivery Addresses</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 pl-7">
            {accountDetails.addresses.map((address) => (
              <Card key={address.id} className={`${address.default ? "border-green-300 dark:border-green-700" : ""}`}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {address.type === "Home" ? (
                        <Home className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{address.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {address.street}, {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                  </div>
                  {address.default && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                    >
                      Default
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

